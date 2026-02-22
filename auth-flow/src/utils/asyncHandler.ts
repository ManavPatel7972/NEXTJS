import { NextResponse } from "next/server";
import { ApiError } from "./ApiError";

export async function asyncHandler(req: Request, handler: Function) {
  //! try
  try {
    return await handler(req);
  } catch (error) {
    //! custom error
    console.log("Error InstanceOf  ApiError ?? ==", error instanceof ApiError);

    console.log("Error ====>", error);
    console.log("Error Message ====>", error.message);

    if (error instanceof ApiError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.statusCode },
      );
    }

    //! unknown error
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    );
  }
}

// import { NextResponse } from "next/server";

// export async function asyncHandler(req: Request, handler: Function) {
//   try {
//     return await handler(req);
//   } catch (error: any) {

//     console.log("Is ApiError =", error?.isApiError);

//     if (error?.isApiError) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: error.message,
//         },
//         { status: error.statusCode }
//       );
//     }

//     return NextResponse.json(
//       { success: false, message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }
