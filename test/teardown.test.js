import pool from "../src/db/mysql.js";

/**
 * @testgroup Closing all MySQL connections
 */
after(async function () {
  if (pool && pool.end) {
    await pool.end();
    console.log("MySQL pool closed.");
  }
});
