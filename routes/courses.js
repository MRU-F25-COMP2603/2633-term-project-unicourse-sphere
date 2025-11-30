import express from "express";
import pool from "../src/db/mysql.js"; // Ensure your database pool is correctly set up
import * as CONSTANTS from "../constants.js"; // Import constants if needed for error handling

// Create the router function
export function createCoursesRouter() {
  const router = express.Router();

  // Route to fetch details of a specific course
  router.get("/:courseCode", async (req, res) => {
    const { courseCode } = req.params;

    try {
      // Fetch course details based on the course code
      const [rows] = await pool.query(
        `SELECT 
            c.code, 
            c.title, 
            c.description, 
            c.category AS department, 
            p.name AS professor, 
            prof.display_name AS mentor  -- Corrected: Join profiles to get mentor's name
        FROM courses c
        LEFT JOIN course_professors cp ON c.course_id = cp.course_id
        LEFT JOIN professors p ON cp.professor_id = p.professor_id
        LEFT JOIN mentor_pairs mp ON c.course_id = mp.course_id
        LEFT JOIN users m ON mp.mentor_id = m.user_id
        LEFT JOIN profiles prof ON m.user_id = prof.user_id  -- Join profiles for mentor name
        WHERE c.code = ?`,
        [courseCode],
      );

      if (rows.length === 0) {
        return res
          .status(CONSTANTS.STATUS_NOT_FOUND)
          .json({ error: "Course not found" });
      }

      // Send the course details as JSON
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res
        .status(CONSTANTS.STATUS_DB_QUERY_FAILED)
        .json({ error: "Database query failed" });
    }
  });

  return router;
}
