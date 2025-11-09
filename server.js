import express from "express";
import path from "path";
import * as CONSTANTS from "./constants.js";

export function createServer() {
  const app = express();

  app.get("/", (req, res) => {
    // Use FILE_NAME from env if set, else fallback to CONSTANTS
    const fileName = process.env.FILE_NAME || CONSTANTS.FILE_NAME;
    const filePath = path.resolve(fileName);

    res.sendFile(filePath, (err) => {
      if (err) {
        return res
          .status(CONSTANTS.STATUS_NOT_FOUND)
          .send(CONSTANTS.ERR_MSG_FILE_NF);
      }
    });
  });

  // Catch-all 404 for other routes
  app.use((req, res) => {
    res.status(CONSTANTS.STATUS_NOT_FOUND).send(CONSTANTS.ERR_MSG_FILE_NF);
  });

  return app;
}

// Start server if this file is run directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const server = createServer();
  server.listen(CONSTANTS.PORT, (err) => {
    if (err) {
      console.error("Something went wrong:", err);
    } else {
      console.log(`Server is listening on port ${CONSTANTS.PORT}`);
    }
  });
}
