import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { asyncHandler } from "../../../../utils/asyncHandler";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User.model";
import { ApiError } from "next/dist/server/api-utils";
import { generateAccessToken, generateRefreshToken } from "../../../../lib/jwt";
import { ApiResponse } from "../../../../utils/ApiResponse";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(404, "User Not found");
    }

    if (!user.googleId) {
      const isPassMatch = await bcrypt.compare(password, user.password!);

      if (!isPassMatch) {
        throw new ApiError(401, "Invalid credentials");
      }
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    const response = NextResponse.json(
      new ApiResponse("User Login Successfully.", {
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          //!For only Checking Remove after testing completed (Because it is not safe to send token in fronted only store in httpOnly cookies)
          token: {
            accessToken,
            refreshToken,
          },
        },
      }),
    );

    //Store Access Token (Short lived)
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 15, // 15 minutes
      path: "/",
    });

    //Store Refresh Token (Long lived)
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.log("Login Error =", error);
    return NextResponse.json(
      { message: "Login Failed", error },
      { status: 500 },
    );
  }
}
