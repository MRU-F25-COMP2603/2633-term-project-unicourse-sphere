import { expect } from "chai";
import pool from "../src/db/mysql.js";

describe("MySQL connection", () => {
  it("SELECT 1 + 1 returns 2", async () => {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    expect(rows[0].result).to.equal(2);
  });
});
