const db = require('pg').Pool
module.exports = new db({
  user: "postgres",
  host: "localhost",
  database: "RMS",
  password: "postgres",
  port: 5432
})