import express from "express";
import path from "path";
import * as CONSTANTS from "./constants.js";
import pool from "./src/db/mysql.js";
import { fileURLToPath } from "url";

export function createServer() {
  const app = express();

  app.use(express.json());

  // Serve the homepage
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

  // Search endpoint: /api/search?q=<searchTerm>
  app.get("/api/search", async (req, res) => {
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
      res.status(500).json({ error: "Database query failed" });
    }
  });

  // 404 for unknown routes
  app.use((req, res) => {
    res.status(CONSTANTS.STATUS_NOT_FOUND).send(CONSTANTS.ERR_MSG_FILE_NF);
  });

  return app;
}

// Only start server if this file is run directly
if (
  path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1])
) {
  const server = createServer();
  server.listen(CONSTANTS.PORT, () => {
    console.log(`Server is listening on port ${CONSTANTS.PORT}`);
  });
}
