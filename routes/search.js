import express from "express";
import pool from "../src/db/mysql.js";
import * as CONSTANTS from "../constants.js";

export function createSearchRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const q = req.query.q?.trim();
    if (!q) return res.json([]);

    try {
      const [rows] = await pool.query(
        `SELECT c.course_id, c.code, c.title, c.description
        FROM courses c
        WHERE c.code LIKE ? OR c.title LIKE ?
        LIMIT 20`,
        [`%${q}%`, `%${q}%`],
      );
      res.json(rows);
    } catch (err) {
      console.error(err);
      res
        .status(CONSTANTS.STATUS_DB_QUERY_FAILED)
        .json({ error: "Database query failed" });
    }
  });

  return router;
}
