import { OAuth2Client } from "google-auth-library";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { ApiError } from "../../../../utils/ApiError";
import User from "../../../../models/User.model";
import { generateAccessToken, generateRefreshToken } from "../../../../lib/jwt";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
  try {
    await connectDB();

    const { idToken } = await req.json();

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      throw new ApiError(400, "Invalid Google token");
    }

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    const response = NextResponse.json({
      message: "Google Login Successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        googleId: user.googleId,
        //!For only Checking Remove after testing completed (Because it is not safe to send token in fronted only store in httpOnly cookies)
        token: {
          accessToken,
          refreshToken,
        },
      },
    });

    //Access Token Cookie
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 15, // 15 minutes
      path: "/",
    });

    //Refresh Token Cookie
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.log("Google Login Error =", error);
    return NextResponse.json(
      { message: "Google Failed", error },
      { status: 500 },
    );
  }
}
