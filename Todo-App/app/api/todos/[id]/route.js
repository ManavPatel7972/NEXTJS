// import Todo from "@/models/todo.model.js";
// import { connectDB } from "@/lib/connectDB";
// import { getLoggedInUser } from "@/lib/auth";

// export async function GET(_, { params }) {
//   await connectDB();
//   const user = await getLoggedInUser();
//   if (user instanceof Response) return user;

//   const { id } = await params;
//   const todo = await Todo.findOne({ _id: id, userId: user.id });
//   if (!todo) {
//     return Response.json(
//       { error: "Todo not found" },
//       {
//         status: 404,
//       }
//     );
//   }
//   return Response.json(todo);
// }

// export async function PUT(request, { params }) {
//   await connectDB();
//   const user = await getLoggedInUser();
//   if (user instanceof Response) return user;

//   const editTodoData = await request.json();
//   const { id } = await params;
//   const editedTodo = await Todo.updateMany(
//     { _id: id, userId: user.id },
//     editTodoData,
//     {
//       new: true,
//     }
//   );

//   return Response.json(editedTodo);
// }

// export async function DELETE(_, { params }) {
//   await connectDB();
//   const user = await getLoggedInUser();
//   if (user instanceof Response) return user;

//   const { id } = await params;
//   await Todo.deleteOne({ _id: id, userId: user.id });
//   return new Response(null, {
//     status: 204,
//   });
// }


import Todo from "@/models/todo.model.js";
import { connectDB } from "@/lib/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// ---------------- GET SINGLE TODO ----------------
export async function GET(_, { params }) {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  const todo = await Todo.findOne({
    _id: id,
    userId: session.user.id,
  });

  if (!todo) {
    return Response.json(
      { error: "Todo not found" },
      { status: 404 }
    );
  }

  return Response.json(todo);
}

// ---------------- UPDATE TODO ----------------
export async function PUT(request, { params }) {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const editTodoData = await request.json();

  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: id, userId: session.user.id },
    editTodoData,
    { new: true }
  );

  if (!updatedTodo) {
    return Response.json(
      { error: "Todo not found" },
      { status: 404 }
    );
  }

  return Response.json(updatedTodo);
}

// ---------------- DELETE TODO ----------------
export async function DELETE(_, { params }) {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  const deleted = await Todo.findOneAndDelete({
    _id: id,
    userId: session.user.id,
  });

  if (!deleted) {
    return Response.json(
      { error: "Todo not found" },
      { status: 404 }
    );
  }

  return new Response(null, { status: 204 });
}