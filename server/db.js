require("dotenv").config();
const Pool = require("pg").Pool;

const db = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
});

module.exports = db;
