import express from "express";
import pool from "../src/db/mysql.js";
import * as CONSTANTS from "../constants.js";

export function createProfessorSpotlightRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const [rows] = await pool.query(
        `SELECT professor_id, name, department, bio
         FROM professors
         ORDER BY RAND()
         LIMIT 3`,
      );

      res.json(rows);
    } catch (err) {
      console.error(err);
      res
        .status(CONSTANTS.STATUS_DB_QUERY_FAILED)
        .json({ error: "Failed to fetch spotlight professors" });
    }
  });

  return router;
}
