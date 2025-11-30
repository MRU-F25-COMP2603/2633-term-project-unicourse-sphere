import express from "express";
import pool from "../src/db/mysql.js";
import * as CONSTANTS from "../constants.js";

export function createFeaturedCoursesRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const [rows] = await pool.query(
        `SELECT course_id, code, title, description, category, level
         FROM courses
         ORDER BY RAND()
         LIMIT 3`,
      );
      res.json(rows);
    } catch (err) {
      console.error(err);
      res
        .status(CONSTANTS.STATUS_DB_QUERY_FAILED)
        .json({ error: "Failed to fetch featured courses" });
    }
  });

  return router;
}
