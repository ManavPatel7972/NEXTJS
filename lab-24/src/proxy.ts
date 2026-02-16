import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  // console.log("url ===",request)

  // console.log("Request.url ----->", request.url);

  //! 1

  if (url.pathname === "/products") {
    if (!url.searchParams.has("pageNo")) {
      const newUrl = url.clone();

      console.log("New URL ===>", newUrl);

      newUrl.searchParams.set("pageNo", "0");

      console.log("Updated =====>", newUrl);

      return NextResponse.redirect(newUrl);
    }
  }

  //! 3
  if (
    url.pathname.startsWith("/dashboard") &&
    url.searchParams.get("expired") === "true"
  ) {
    const newUrl = url.clone();
    newUrl.searchParams.set("token", "adminNew");
    newUrl.searchParams.delete("expired");
    return NextResponse.redirect(newUrl);
  }

  //! 2
  if (url.pathname.startsWith("/dashboard")) {
    const token = url.searchParams.get("token");

    if (token !== "admin" && token !== "adminNew") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products", "/dashboard/:path*"],
};
