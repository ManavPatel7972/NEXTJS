import { connectDB } from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  const { identifier, code } = await req.json();

  const user = await UserModel.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "User not found",
    });
  }

  if (user.isVerified) {
    return NextResponse.json({
      success: false,
      message: "User is already verified Please login.",
    });
  }

  if (user.verifyCode !== code) {
    return NextResponse.json({
      success: false,
      message: "Invalid verification code",
    });
  }

  if (user.verifyCodeExpiry < new Date()) {
    return NextResponse.json({
      success: false,
      message: "Verification code expired",
    });
  }

  user.isVerified = true;
  user.verifyCode = undefined as any;
  user.verifyCodeExpiry = undefined as any;

  await user.save();

  return NextResponse.json({
    success: true,
    message: "Account verified successfully",
  });
}
