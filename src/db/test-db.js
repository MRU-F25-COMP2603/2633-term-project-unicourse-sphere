import { expect } from "chai";
import pool from "../src/db/mysql.js"; // adjust path if needed

/**
 * @testgroup Database connectivity
 */
describe("Database connection basic checks", function () {
  /**
   * @test
   * @description Ensures database responds to a simple arithmetic query.
   * @query "SELECT 1 + 1 AS result"
   * @expectedResult result = 2
   */
  it("verifies that MySQL connection works and returns a test value", async function () {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");

    expect(rows.length).to.be.greaterThan(0);
    expect(rows[0].result).to.equal(2);
  });

  // Optional: close pool after tests
  after(async function () {
    await pool.end();
  });
});
