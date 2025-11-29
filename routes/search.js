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
        `SELECT c.course_id, c.code, c.title, c.description, u.email AS professor
         FROM courses c
         LEFT JOIN enrollments e ON c.course_id = e.course_id AND e.role_in_course='mentor'
         LEFT JOIN users u ON e.user_id = u.user_id
         WHERE c.code LIKE ? OR c.title LIKE ? OR u.email LIKE ?
         LIMIT 20`,
        [`%${q}%`, `%${q}%`, `%${q}%`],
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
