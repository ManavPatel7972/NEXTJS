import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";


export async function GET() {
  const students = await prisma.students.findMany();
  console.log(students);

  return NextResponse.json(students);
//   return new Response(JSON.stringify(students), {
//     headers: { "Content-Type": "application/json" },
//   });
}
