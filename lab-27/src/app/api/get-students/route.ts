import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await pool.query("SELECT * FROM students");
    console.log("Data = ", data);

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Data Not Found" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Data Found", data: data.rows },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error Fetch Data = ", error);
    return NextResponse.json(
      { success: false, message: "Error Fetch Data", error },
      { status: 500 },
    );
  }
}
