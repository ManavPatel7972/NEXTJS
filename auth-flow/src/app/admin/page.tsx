import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { connectDB } from "../../lib/db";
import { verifyAccessToken } from "../../lib/jwt";
import User from "../../models/User.model";

export default async function AdminPage() {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) redirect("/login");

  const decoded = verifyAccessToken(token!);
  const user = await User.findById(decoded.userId);

  if (!user || user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Panel</h1>
      <p>Only admins can see this.</p>
    </div>
  );
}
