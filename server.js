import express from "express";
import * as CONSTANTS from "./constants.js";
import { createHomeRouter } from "./routes/home.js";
import { createSearchRouter } from "./routes/search.js";

export function createServer() {
  const app = express();
  app.use(express.json());

  // Mount routers
  app.use("/", createHomeRouter());
  app.use("/api/search", createSearchRouter());

  // 404 handler
  app.use((req, res) => {
    res.status(CONSTANTS.STATUS_NOT_FOUND).send(CONSTANTS.ERR_MSG_FILE_NF);
  });

  return app;
}

// Only start server if run directly
if (process.argv[1].endsWith("server.js")) {
  const server = createServer();
  server.listen(CONSTANTS.PORT, () => {
    console.log(`Server listening on port ${CONSTANTS.PORT}`);
  });
}
