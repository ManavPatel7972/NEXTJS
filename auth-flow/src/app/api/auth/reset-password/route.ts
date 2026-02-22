import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Otp from "../../../../models/Otp.model";
import { ApiError } from "../../../../utils/ApiError";
import User from "../../../../models/User.model";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, otp, newPassword } = await req.json();

    const record = await Otp.findOne({ email, otp });

    if (!record) {
      throw new ApiError(400, "Invalid or Expired OTP");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(404, "User Not Found");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user!.tokenVersion += 1;

    await user.save();

    await Otp.deleteMany({ email });

    return NextResponse.json({
      message: "Password Reset Successful Please Login Further",
    });
  } catch (error) {
    console.log("Reset-password Error =", error);
    return NextResponse.json(
      { message: "Reset-Password Failed !", error },
      { status: 500 },
    );
  }
}
