import { expect } from "chai";
import pool from "../src/db/mysql.js";

/**
 * @testgroup Course search basic checks
 */
describe("Course search basic checks", function () {
  // Seed several courses before tests
  before(async function () {
    await pool.query("INSERT IGNORE INTO courses (code, title) VALUES (?, ?)", [
      "COMP-2603",
      "Software Engineering",
    ]);
    await pool.query("INSERT IGNORE INTO courses (code, title) VALUES (?, ?)", [
      "COMP-2000",
      "Introduction to Programming",
    ]);
    await pool.query("INSERT IGNORE INTO courses (code, title) VALUES (?, ?)", [
      "MATH-1100",
      "Discrete Mathematics",
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

  /**
   * @test
   * @description Ensures that searching for a non-existent course returns no rows.
   * @query "SELECT * FROM courses WHERE code = ?"
   * @expectedResult rows.length = 0
   */
  it("returns no results for a non-existent course code", async function () {
    const [rows] = await pool.query("SELECT * FROM courses WHERE code = ?", [
      "NOPE-9999",
    ]);
    expect(rows.length).to.equal(0);
  });

  /**
   * @test
   * @description Verifies searching by partial title returns matching courses.
   * @query "SELECT code FROM courses WHERE title LIKE ?"
   * @expectedResult code = "COMP-2603"
   */
  it("finds a course using partial title match", async function () {
    const [rows] = await pool.query(
      "SELECT code FROM courses WHERE title LIKE ?",
      ["%Engineering%"],
    );
    expect(rows.length).to.be.greaterThan(0);
    expect(rows.map((r) => r.code)).to.include("COMP-2603");
  });

  /**
   * @test
   * @description Verifies duplicate inserts are ignored by INSERT IGNORE.
   * @query "INSERT IGNORE INTO courses (code, title) VALUES (?, ?)"
   * @expectedResult No additional row created for existing course
   */
  it("ignores duplicate course inserts", async function () {
    const [before] = await pool.query(
      "SELECT COUNT(*) AS count FROM courses WHERE code = ?",
      ["COMP-2603"],
    );

    await pool.query("INSERT IGNORE INTO courses (code, title) VALUES (?, ?)", [
      "COMP-2603",
      "Software Engineering",
    ]);

    const [after] = await pool.query(
      "SELECT COUNT(*) AS count FROM courses WHERE code = ?",
      ["COMP-2603"],
    );

    expect(after[0].count).to.equal(before[0].count);
  });

  /**
   * @test
   * @description Ensures course title lookups are case-insensitive.
   * @query "SELECT code FROM courses WHERE LOWER(title) = LOWER(?)"
   * @expectedResult code = "COMP-2000"
   */
  it("performs case-insensitive title search", async function () {
    const [rows] = await pool.query(
      "SELECT code FROM courses WHERE LOWER(title) = LOWER(?)",
      ["introduction to programming"],
    );
    expect(rows.length).to.be.greaterThan(0);
    expect(rows[0].code).to.equal("COMP-2000");
  });

  /**
   * @test
   * @description Verifies multiple courses can be retrieved in a single query.
   * @query "SELECT code FROM courses"
   * @expectedResult At least 3 seeded courses returned
   */
  it("retrieves multiple courses from table", async function () {
    const [rows] = await pool.query("SELECT code FROM courses");
    expect(rows.length).to.be.at.least(3);
    expect(rows.map((r) => r.code)).to.include("COMP-2603");
    expect(rows.map((r) => r.code)).to.include("COMP-2000");
    expect(rows.map((r) => r.code)).to.include("MATH-1100");
  });
});
