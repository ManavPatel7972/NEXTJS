import { connectDB } from "@/lib/connectDB";
import User from "@/models/user.model.js";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  const user = await request.json();
  try {
    const { name, email, password } = user;
    
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All Fields Are Required.. " },
        { status: 401 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json(
      {
        name,
        email,
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return Response.json(
        { error: "Email already exists" },
        {
          status: 409,
        },
      );
    } else {
      return Response.json(
        { error: "Something went wrong" },
        {
          status: 500,
        },
      );
    }
  }
}
