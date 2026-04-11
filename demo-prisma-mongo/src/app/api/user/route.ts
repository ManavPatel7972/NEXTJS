import { prisma } from "@/lib/prisma";


export async function POST(request: Request) {
  const { name, email } = await request.json();
  console.log("Received data:", { name, email });
  try {
    const user = await prisma.users.create({
      data: {
        name: name,
        password: "hashed_password",
        email: email,
        tokenVersion: 0,
        role: "USER",
      },
    });

    console.log("Created user:", user);
    return new Response(JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log("Error creating user:", err);
    return new Response(JSON.stringify({ error: "Failed to create user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  try {
    const users = await prisma.users.findMany();
    console.log("Fetched users:", users);
    return new Response(JSON.stringify(users), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
