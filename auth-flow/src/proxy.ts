import { NextResponse } from "next/server";
import { verifyAccessToken } from "./lib/jwt";
import User from "./models/User.model";
import { cookies } from "next/headers";
import { connectDB } from "./lib/db";

export default async function proxy(req: any) {
  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  await connectDB();

  const decoded = verifyAccessToken(token);

  const user = await User.findById(decoded.userId);

  if (!user || decoded.tokenVersion !== user.tokenVersion) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
