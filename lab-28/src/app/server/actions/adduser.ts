"use server"
import pool from "@/app/lib/mysql"

export async function addUser(formData: FormData) {
  const name = formData.get("name")
  const password = formData.get("password")
  await pool.query(
    `INSERT INTO users (name, password) VALUES ('${name}', '${password}')`
  )
  console.log("User inserted:", name)
} 