// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   //proxy.js
//   function middleware(req) {
//     const { pathname } = req.nextUrl;

//     if (pathname === "/login") {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//   },

//   {
//     pages: {
//       signIn: "/login",
//     },
//   },
// );

// export const config = {
//   matcher: ["/", "/api/todos/:path*"],
// };

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // If logged in and trying to access login page
    if (pathname === "/login" && token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    pages: {
      signIn: "/login",
    },
  },
);

export const config = {
  matcher: ["/", "/login", "/api/todos/:path*"],
};
