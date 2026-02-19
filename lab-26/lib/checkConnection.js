import pool from "./MySqlDB";


export async function checkConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error.message);
  }
}

