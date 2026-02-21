import { cookies } from "next/headers";

import { redirect } from "next/navigation";
import React from "react";
import { connectDB } from "../../lib/db";
import { verifyAccessToken } from "../../lib/jwt";
import User from "../../models/User.model";

export default async function DashboardPage() {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const decoded = verifyAccessToken(token!);

    const user = await User.findById(decoded.userId);

    if (!user || user.tokenVersion !== decoded.tokenVersion) {
      redirect("/login");
    }

    return (
      <div style={{ padding: "40px" }}>
        <h1>Dashboard</h1>
        <p>Welcome {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>

        <form action="/api/auth/logout" method="POST">
          <button type="submit">Logout</button>
        </form>
      </div>
    );
  } catch {
    redirect("/login");
  }
}
