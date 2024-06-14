import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req, res) {
    const { nextUrl, nextauth } = req
    const isAuthenticated = nextauth.token
    if (isAuthenticated) {
      if (
        nextUrl.pathname == "/register" ||
        nextUrl.pathname == "/lupa-kata-sandi"
      ) {
        return NextResponse.redirect(new URL("/", req.url))
      }

      if (nextUrl.pathname == "/login") {
        return NextResponse.redirect(new URL("/", req.url))
      }
      return NextResponse.next()
    } else {
      if (
        nextUrl.pathname == "/register" ||
        nextUrl.pathname == "/lupa-kata-sandi"
      ) {
        return NextResponse.next()
      }

      return NextResponse.next()
    }
  },
  {
    pages: {
      signIn: "/login",
    },
  }
)

export const config = {
  matcher: [
    "/",
    "/login",
    "/dashboard/:path*",
    "/api/v1/activities/:path*",
    "/api/v1/buyers/:path*",
    "/api/v1/commodity/:path*",
    "/api/v1/cultivation-guide/:path*",
    "/api/v1/cycles/:path*",
    "/api/v1/dashboard/:path*",
    "/api/v1/farmer-lands/:path*",
    "/api/v1/farmers/:path*",
    "/api/v1/harvests/:path*",
    "/api/v1/histories/:path*",
    "/api/v1/sells/:path*",
  ],
}
