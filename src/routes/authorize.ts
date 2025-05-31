import { DiscordOAuth2 } from "../services/DiscordOAuth2";
import { ErrorCodes } from "../types/ErrorCodes";
import axios from "axios";
import { Request, Response } from "express";

export async function authorizeGET(req: Request, res: Response) {
  const { code } = req.query;

  if (code) {
    if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET) {
      res.status(500).json({
        success: false,
        error:
          "Discord client ID or secret is not set in environment variables.",
      });
      console.error(
        "Discord client ID or secret is not set in environment variables."
      );
      return;
    }

    const tokenResponseData = await DiscordOAuth2.getAccessToken(
      code as string
    );

    if (process.env.DEBUG) {
      console.log("Discord OAuth2 Token Response Data:");
      console.log(tokenResponseData);
    }

    if (tokenResponseData.access_token) {
      const access = tokenResponseData?.access_token;

      const userinfo = await axios.get(
        "https://discord.com/api/v10/users/@me",
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const user = userinfo.data;

      res.status(200).json({
        success: true,
        data: {
          user,
        },
      });
      return;
    } else
      res.status(500).json({
        success: false,
        error: ErrorCodes.DISCORD_NO_ACCESS_TOKEN,
      });
  } else
    res.status(400).json({
      success: false,
      error: ErrorCodes.DISCORD_CODE_MISSING,
    });
}
