import dotenv from "dotenv";
import {PrismaClient} from "../generated/prisma/index.js";
dotenv.config();

export const prisma = new PrismaClient();



