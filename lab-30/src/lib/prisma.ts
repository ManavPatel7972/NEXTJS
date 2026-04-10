import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  connectionLimit: 5
})

const prisma = new PrismaClient({adapter})

export {prisma}