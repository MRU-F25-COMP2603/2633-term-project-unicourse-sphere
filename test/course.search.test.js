import { expect } from "chai";
import pool from "../src/db/mysql.js";

/**
 * @testgroup Course search basic checks
 */
describe("Course search basic checks", function () {
  // Seed a course before tests
  before(async function () {
    await pool.query("INSERT IGNORE INTO courses (code, title) VALUES (?, ?)", [
      "COMP-2603",
      "Software Engineering",
    ]);
  });

  /**
   * @test
   * @description Verifies that a seeded course can be found by its code.
   * @query "SELECT title FROM courses WHERE code = ?"
   * @expectedResult title = "Software Engineering"
   */
  it("finds seeded course by code", async function () {
    const [rows] = await pool.query(
      "SELECT title FROM courses WHERE code = ?",
      ["COMP-2603"],
    );
    expect(rows.length).to.be.greaterThan(0);
    expect(rows[0].title).to.equal("Software Engineering");
  });
});
