import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Otp from "../../../../models/Otp.model";
import { sendEmail } from "../../../../lib/sendEmail";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email } = await req.json();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 60 * 10),
    });

    await sendEmail(email, otp);

    return NextResponse.json(
      { message: "OTP Sent Successfully," },
      { status: 200 },
    );
  } catch (error) {
    console.log("Forgot-Password Error =", error);
    return NextResponse.json(
      { message: "Forgot-Password Failed", error },
      { status: 500 },
    );
  }
}
