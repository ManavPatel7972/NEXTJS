import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import User from "../../../../models/User.model";
import { connectDB } from "../../../../lib/db";
import { verifyAccessToken } from "../../../../lib/jwt";
import { ApiError } from "next/dist/server/api-utils";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { oldPassword, newPassword } = await req.json();

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 },
      );
    }

    const decoded = verifyAccessToken(accessToken);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    //! Google users cannot change password
    if (user.googleId) {
      return NextResponse.json(
        { success: false, message: "Google users cannot change password" },
        { status: 400 },
      );
    }

    const isPassMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPassMatch) {
      return NextResponse.json(
        { success: false, message: "Old password is incorrect" },
        { status: 400 },
      );
    }

    const hashedPass = await bcrypt.hash(newPassword, 10);

    user.password = hashedPass;

    //! after Change Password Invalidate all sessions
    user.tokenVersion += 1;
    user.refreshToken = undefined;

    await user.save();

    //! Clear cookies (force re-login)
    const response = NextResponse.json(
      {
        success: true,
        message: "Password changed successfully. Please login again.",
      },
      { status: 200 },
    );

    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    return response;
  } catch (error) {
    console.log("Change password Error =", error);
    return NextResponse.json(
      { success: false, message: "Change password Failed", error },
      { status: 500 },
    );
  }
}
