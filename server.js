import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import * as CONSTANTS from "./constants.js";

const __filename = fileURLToPath(import.meta.url);

export function createServer() {
  const app = express();

  app.get("/", (req, res) => {
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

  app.use((req, res) => {
    res.status(CONSTANTS.STATUS_NOT_FOUND).send(CONSTANTS.ERR_MSG_FILE_NF);
  });

  return app;
}

if (process.argv[1] === __filename) {
  const server = createServer();
  server.listen(CONSTANTS.PORT, (err) => {
    if (err) {
      console.error("Something went wrong:", err);
    } else {
      console.log(`Server is listening on port ${CONSTANTS.PORT}`);
    }
  });
}
