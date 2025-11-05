import { expect } from "chai";
import pool from "../src/db/mysql.js";

describe("Course search basic checks", function () {
  it("finds seeded course by code", async function () {
    const [rows] = await pool.query(
      "SELECT title FROM courses WHERE code = ?",
      ["COMP-2603"],
    );
    expect(rows.length).to.be.greaterThan(0);
    expect(rows[0].title).to.equal("Software Engineering");
  });
});
