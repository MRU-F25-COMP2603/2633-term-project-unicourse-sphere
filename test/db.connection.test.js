import { expect } from "chai";
import pool from "../src/db/mysql.js";

/**
 * @testgroup MySQL connection
 */
describe("MySQL connection", function () {
  /**
   * @test
   * @description Executes a simple arithmetic query to verify database connectivity.
   * @query "SELECT 1 + 1 AS result"
   * @expectedResult 2
   */
  it("SELECT 1 + 1 returns 2", async function () {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    expect(rows[0].result).to.equal(2);
  });
});
