import { DiscordOAuth2 } from "../services/DiscordOAuth2";
import { ErrorCodes } from "../types/ErrorCodes";
import { Request, Response } from "express";

export async function refreshTokenGET(req: Request, res: Response) {
  const token = req.params.token;

  if (!token) {
    res.status(400).json({
      success: false,
      error: ErrorCodes.DISCORD_REFRESH_TOKEN_INVALID,
    });
  }

  try {
    const data = await DiscordOAuth2.refreshAccessToken(token);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error("Error refreshing token:", error);

    res.status(500).json({
      success: false,
      error: error?.message || ErrorCodes.DISCORD_REFRESH_FAILED,
    });
  }
}
