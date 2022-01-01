/*const db = require('pg').Pool
module.exports = new db({
  user: "postgres",
  host: "localhost",
  database: "RMS",
  password: "root",
  port: 5432,
})*/

const db = require('pg').Pool
module.exports = new db({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PSWD,
  port: process.env.DBPORT,
  ssl: { rejectUnauthorized: false }
})