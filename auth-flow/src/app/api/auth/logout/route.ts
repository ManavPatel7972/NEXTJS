import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const response = NextResponse.json(
      { message: "Logout Successfully." },
      { status: 200 },
    );
  
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
  
    return response;
  } catch (error) {
    console.log("Logout Error =", error);
    
    return NextResponse.json(
          { message: "Logout Failed", error },
          { status: 500 },
        );
  }
}
