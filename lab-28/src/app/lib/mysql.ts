import mysql from "mysql2/promise";

const pool = mysql.createPool({
  database: "server_action_demo",
  host: "localhost",
  password: "M@n@v#7972",
  port: 3306,
  user: "root",
});

export default pool;
