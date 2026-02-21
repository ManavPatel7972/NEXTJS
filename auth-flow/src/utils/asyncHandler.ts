import { NextResponse } from "next/server";
import { ApiError } from "./ApiError";

export const asyncHandler = (fn: Function) => {
  async (req: Request, context?: any) => {
    try {
      return await fn(req, context);
    } catch (error: any) {
      console.log("Error ===>", error);

      if (error instanceof ApiError) {
        return NextResponse.json(
          { success: false, message: error.message },
          { status: error.statusCode },
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: "Internal Server Error",
          error: error.message,
        },
        { status: 500 },
      );
    }
  };
};
