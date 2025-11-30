import express from "express";
import path from "path";
import * as CONSTANTS from "../constants.js";

export function createHomeRouter() {
  const router = express.Router();

  router.get("/", (req, res) => {
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

  return router;
}
