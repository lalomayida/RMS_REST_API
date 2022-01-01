/*const db = require('pg').Pool
module.exports = new db({
  user: "postgres",
  host: "localhost",
  database: "RMS",
  password: "root",
  port: 5432,
})
*/
const db = require('pg').Pool
module.exports = new db({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})
    