// import { getLoggedInUser } from "@/lib/auth";
// import { connectDB } from "@/lib/connectDB";
// import Todo from "@/models/todo.model.js";
// import User from "@/models/user.model.js";
// import { cookies } from "next/headers";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";

// const session = await getServerSession(authOptions);

// if (!session) {
//   return Response.json({ error: "Unauthorized" }, { status: 401 });
// }

// export async function GET() {
//   await connectDB();
//   const user = await getLoggedInUser();
//   if (user instanceof Response) {
//     return user;
//   }
//   const allTodos = await Todo.find({ userId: user.id });

//   return Response.json(
//     allTodos.map(({ id, text, completed }) => ({ id, text, completed })),
//   );
// }

// export async function POST(request) {
//   await connectDB();
//   const user = await getLoggedInUser();
//   if (user instanceof Response) return user;

//   const todo = await request.json();
//   const { id, text, completed } = await Todo.create({
//     text: todo.text,
//     userId: user._id,
//   });

//   return Response.json(
//     { id, text, completed },
//     {
//       status: 201,
//     },
//   );
// }



import { connectDB } from "@/lib/connectDB";
import Todo from "@/models/todo.model.js";
import User from "@/models/user.model.js";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// ---------------- GET TODOS ----------------
export async function GET() {
  await connectDB();

  const session = await getServerSession(authOptions);
  console.log("Session====>", session);
  
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findOne({ email: session.user.email });

  const allTodos = await Todo.find({ userId: user._id });

  return Response.json(
    allTodos.map(({ _id, text, completed }) => ({
      id: _id,
      text,
      completed,
    }))
  );
}

// ---------------- CREATE TODO ----------------
export async function POST(request) {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findOne({ email: session.user.email });

  const body = await request.json();

  const newTodo = await Todo.create({
    text: body.text,
    userId: user._id,
  });

  return Response.json(
    {
      id: newTodo._id,
      text: newTodo.text,
      completed: newTodo.completed,
    },
    { status: 201 }
  );
}