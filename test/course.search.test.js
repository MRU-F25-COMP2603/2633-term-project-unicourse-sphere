import { expect } from "chai";
import pool from "../src/db/mysql.js";

/**
 * @testgroup Course search basic checks (using existing database)
 */
describe("Course search basic checks", function () {
  // No seeding, use existing database courses

  /**
   * @test
   * @description Verifies that an existing course can be found by its code.
   */
  it("finds an existing course by code", async function () {
    const [rows] = await pool.query(
      "SELECT title FROM courses WHERE code = ?",
      ["COMP 2633"], // match your real course code
    );
    expect(rows.length).to.be.greaterThan(0);
    expect(rows[0].title).to.equal("Foundations of Software Engineering"); // match your real title
  });

  /**
   * @test
   * @description Ensures that searching for a non-existent course returns no rows.
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
   */
  it("finds courses using partial title match", async function () {
    const [rows] = await pool.query(
      "SELECT code FROM courses WHERE title LIKE ?",
      ["%Software%"], // partial match for your real course title
    );
    expect(rows.length).to.be.greaterThan(0);
    expect(rows.map((r) => r.code)).to.include("COMP 2633");
  });

  /**
   * @test
   * @description Ensures case-insensitive title search works.
   */
  it("performs case-insensitive title search", async function () {
    const [rows] = await pool.query(
      "SELECT code FROM courses WHERE LOWER(title) = LOWER(?)",
      ["foundations of software engineering"],
    );
    expect(rows.length).to.be.greaterThan(0);
    expect(rows[0].code).to.equal("COMP 2633");
  });

  /**
   * @test
   * @description Verifies multiple courses can be retrieved.
   */
  it("retrieves multiple courses from table", async function () {
    const [rows] = await pool.query("SELECT code FROM courses");
    expect(rows.length).to.be.at.least(3); // adjust based on your DB
    const codes = rows.map((r) => r.code);
    expect(codes).to.include("COMP 2633");
    expect(codes).to.include("COMP 1501");
    expect(codes).to.include("MATH 1203");
  });
});
