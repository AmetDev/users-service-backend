const { Pool } = require("pg");
const pool = new Pool({
  user: "admin",
  database: "usersdb",
  password: "2000",
  port: 5432,
  host: "localhost",
});

module.exports = { pool };


