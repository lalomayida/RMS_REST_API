/*const db = require('pg').Pool
module.exports = new db({
  user: "postgres",
  host: "localhost",
  database: "RMS",
  password: "root",
  port: 5432,
})

const db = require('pg').Pool
module.exports = new db({
  user: "lxyhryklybyfld",
  host: "ec2-34-236-87-247.compute-1.amazonaws.com",
  database: "d7dq58rt7ht7c6",
  password: "321107d38a772bfa2382850abf545d178565dbac0d6e015addc5d65989382beb",
  port: "5432",
  ssl: { rejectUnauthorized: false }
})*/


const db = require('pg').Pool
module.exports = new db({
  connectionString: "postgres://"+process.env.USER+":"+process.env.PSWD+"@"+process.env.HOST+":"+process.env.DBPORT+"/"+process.env.DATABASE,
  ssl: { rejectUnauthorized: false }
})

    