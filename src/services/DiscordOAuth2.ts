import { DiscordOAuth2Request } from "@/types/DiscordOAuth2Request";

export class DiscordOAuth2 {
  public static async getAccessToken(
    code: string
  ): Promise<DiscordOAuth2Request> {
    const tokenResponseData = await fetch(
      "https://discord.com/api/oauth2/token",
      {
        method: "POST",
        body: new URLSearchParams({
          client_id: process.env.DISCORD_CLIENT_ID || "",
          client_secret: process.env.DISCORD_CLIENT_SECRET || "",
          code: code as string,
          grant_type: "authorization_code",
          redirect_uri: process.env.DISCORD_REDIRECT_URI || "",
          scope: process.env.DISCORD_SCOPE || "identify",
        }).toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const output = (await tokenResponseData.json()) as DiscordOAuth2Request;
    return output;
  }

  public static async refreshAccessToken(
    refresh_token: string
  ): Promise<DiscordOAuth2Request> {
    const tokenResponseData = await fetch(
      "https://discord.com/api/oauth2/token",
      {
        method: "POST",
        body: new URLSearchParams({
          client_id: process.env.DISCORD_CLIENT_ID || "",
          client_secret: process.env.DISCORD_CLIENT_SECRET || "",
          grant_type: "refresh_token",
          refresh_token: refresh_token,
          redirect_uri: process.env.DISCORD_REDIRECT_URI || "",
          scope: process.env.DISCORD_SCOPE || "identify",
        }).toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const output = (await tokenResponseData.json()) as DiscordOAuth2Request;
    return output;
  }
}
