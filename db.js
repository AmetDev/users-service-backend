const { Pool } = require("pg");
const pool = new Pool({
  user: "admin1",
  database: "usersdb1",
  password: "2005",
  port: 5432,
  host: "localhost",
});

module.exports = { pool };


