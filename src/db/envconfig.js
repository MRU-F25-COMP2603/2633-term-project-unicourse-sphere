import dotenv from "dotenv";
dotenv.config();

export const MYSQL_HOST = process.env.MYSQL_HOST || "127.0.0.1";
export const MYSQL_USER = process.env.MYSQL_USER || "ci_user";
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "ci_password";
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "unicourse_min";
export const MYSQL_PORT = Number(process.env.MYSQL_PORT) || 3306;
