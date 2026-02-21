import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../../models/User.model";
import { asyncHandler } from "../../../../utils/asyncHandler";
import { ApiError } from "next/dist/server/api-utils";
import { ApiResponse } from "../../../../utils/ApiResponse";
import { connectDB } from "../../../../lib/db";

export async function POST(req: Request) {
  try {

    await connectDB();
    const { email, name, password } = await req.json();

    //check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError(400, "User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      new ApiResponse("User Register Successfully.", user),
    );
  } catch (error) {
    console.log("Register Error==>", error);
  }
}
