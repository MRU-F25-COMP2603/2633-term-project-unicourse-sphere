import express from "express";
import pool from "../src/db/mysql.js";
import path from "path";
import { fileURLToPath } from "url";
import * as CONSTANTS from "../constants.js";

export function createCoursesRouter() {
  const router = express.Router();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  router.get("/api/:courseCode", async (req, res) => {
    const { courseCode } = req.params;

    try {
      const [rows] = await pool.query(
        `SELECT 
      c.code, 
      c.title, 
      c.description, 
      c.category AS department, 
      c.level,                -- <--- add this
      p.name AS professor, 
      prof.display_name AS mentor
  FROM courses c
  LEFT JOIN course_professors cp ON c.course_id = cp.course_id
  LEFT JOIN professors p ON cp.professor_id = p.professor_id
  LEFT JOIN mentor_pairs mp ON c.course_id = mp.course_id
  LEFT JOIN users m ON mp.mentor_id = m.user_id
  LEFT JOIN profiles prof ON m.user_id = prof.user_id
  WHERE c.code = ?`,
        [courseCode],
      );

      if (rows.length === 0) {
        return res
          .status(CONSTANTS.STATUS_NOT_FOUND)
          .json({ error: "Course not found" });
      }

      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res
        .status(CONSTANTS.STATUS_DB_QUERY_FAILED)
        .json({ error: "Database query failed" });
    }
  });

  router.get("/:courseCode", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/course_details.html"));
  });

  return router;
}
