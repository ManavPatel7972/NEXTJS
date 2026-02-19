import dotenv from "dotenv";

import mysql from "mysql2/promise";

dotenv.config({});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  password: "M@n@v#7972",
  connectionLimit: 10,
  queueLimit: 0,
});

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "M@n@v#7972",
//   database: "mini_project",
//   connectionLimit: 10,
// });

export default pool;
