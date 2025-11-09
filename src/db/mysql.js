import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Load variables from .env

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "127.0.0.1",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "", // empty string if no password
  database: process.env.MYSQL_DB || "unicourse_min",
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
