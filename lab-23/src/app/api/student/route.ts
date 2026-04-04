import { NextRequest, NextResponse } from "next/server";
import { students } from "../data";

export async function GET() {
  return NextResponse.json(students);
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  const maxId = students.length ? Math.max(...students.map((s) => s.id)) : 0;

  const newStudent = {
    id: maxId + 1,
    name: data.name,
  };

  students.push(newStudent);
  return NextResponse.json(
    {
      newStudent,
    },
    { status: 201 },
  );
}
