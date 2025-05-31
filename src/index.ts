import "dotenv/config";
import express from "express";
import { authorizeGET } from "./routes/authorize";
import { refreshTokenGET } from "./routes/refreshToken";
import { startup } from "./startup";

startup()
  .then(() => {
    const port = process.env.PORT || 8000;
    const app = express();

    app.get("/api/discord/callback", authorizeGET);
    app.get("/api/discord/refresh/:token", refreshTokenGET);

    app.listen(port, () => {
      console.log(`Running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Startup failed:", error);
    process.exit(1);
  });
