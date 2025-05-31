export async function startup() {
  //   DISCORD_CLIENT_ID=1261736715639591013
  // DISCORD_CLIENT_SECRET=KHJDKFJxJvImMRv1nNMYOoQ43ssb0w6J
  // DISCORD_REDIRECT_URI=https://fuzzy-meme-rv9vj6xv9p5cpj76-8000.app.github.dev/api/discord/callback

  // # Express server configuration
  // API_SERVER_PORT=8000
  // DISCORD_SCOPE="identify"
  // DEBUG=true

  if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET) {
    console.error(
      "Discord client ID or secret is not set in environment variables."
    );
    throw new Error(
      "Discord client ID or secret is not set in environment variables."
    );
  }
  if (!process.env.DISCORD_REDIRECT_URI) {
    console.error("Discord redirect URI is not set in environment variables.");
    throw new Error(
      "Discord redirect URI is not set in environment variables."
    );
  }
  if (!process.env.API_SERVER_PORT) {
    console.error("API server port is not set in environment variables.");
    throw new Error("API server port is not set in environment variables.");
  }
  if (!process.env.DISCORD_SCOPE) {
    console.error("Discord scope is not set in environment variables.");
    throw new Error("Discord scope is not set in environment variables.");
  }
  if (!process.env.DEBUG) {
    console.error("Debug mode is not set in environment variables.");
    throw new Error("Debug mode is not set in environment variables.");
  }
  console.log(
    "Startup checks passed. Environment variables are set correctly."
  );
  console.log("Discord Client ID:", process.env.DISCORD_CLIENT_ID);
  console.log("Discord Client Secret:", process.env.DISCORD_CLIENT_SECRET);
  console.log("Discord Redirect URI:", process.env.DISCORD_REDIRECT_URI);
  console.log("API Server Port:", process.env.API_SERVER_PORT);
  console.log("Discord Scope:", process.env.DISCORD_SCOPE);
  console.log(
    "Debug Mode:",
    process.env.DEBUG === "true" ? "Enabled" : "Disabled"
  );
  console.log(
    "Startup completed successfully. All environment variables are set."
  );
  console.log(
    "Ready to start the server. Listening on port:",
    process.env.API_SERVER_PORT
  );
}
