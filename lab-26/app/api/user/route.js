//! --------------------------------------------MYSQL-------------------------------
import pool from "@/lib/MySqlDB";

export async function GET() {
  try {
    const [data, field] = await pool.query("SELECT * FROM users");

    console.log("Data ====> ", data);

    if (data) {
      return Response.json(
        { message: "User fetch Successfully", data },
        { status: 200 },
      );
    }

    return Response.json(
      { message: "User fetch Successfully", data: [] },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error ===>", error);

    return Response.json(
      { error: true, message: "User fetched failed", data: [] },
      { status: 500 },
    );
  }
}

//! ---------------------------------------MONGO---------------------------------

// import { connectDB } from "@/lib/MongoDB";
// import User from "@/model/user.model";

// export async function GET() {
//   try {
//     await connectDB();

//     const user = await User.find();

//     if (user) {
//       return Response.json(
//         { message: "User fetch Successfully", data: user },
//         { status: 200 },
//       );
//     }

//     return Response.json(
//       { message: "User fetch Successfully", data: [] },
//       { status: 200 },
//     );

//   } catch (error) {
//     console.log("Error ===>", error);

//     return Response.json(
//       { error: true, message: "User fetched failed", data: [] },
//       { status: 500 },
//     );
//   }
// }
