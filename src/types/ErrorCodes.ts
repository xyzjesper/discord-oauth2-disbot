export const ErrorCodes = {
  DISCORD_REFRESH_TOKEN_INVALID: "Discord refresh token is invalid or missing.",
  DISCORD_REFRESH_FAILED: "Failed to refresh Discord access token.",
  DISCORD_CODE_MISSING: "Discord authorization code is missing.",
  DISCORD_NO_ACCESS_TOKEN: "No access token received from Discord.",
} as const;
