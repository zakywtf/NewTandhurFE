import { withAuth } from "next-auth/middleware"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req, res) {
    const cookie = cookies()
    const { nextUrl, nextauth } = req
    const isAuthenticated = nextauth.token
    if (isAuthenticated) {
      const isCookieCommodity = cookie.has("selected-commodity")
      
      if (
        nextUrl.pathname == "/register" ||
        nextUrl.pathname == "/lupa-kata-sandi"
      ) {
        return NextResponse.redirect(new URL("/komoditas", req.url))
      }

      if (nextUrl.pathname == "/login" && isCookieCommodity) {
        
        return NextResponse.redirect(new URL("/", req.url))
      }

      if (nextUrl.pathname == "/login" && isCookieCommodity == false) {
        
        return NextResponse.redirect(new URL("/komoditas", req.url))
      }

      if (nextUrl.pathname == "/komoditas" && isCookieCommodity == false) {
        
        
        return NextResponse.next()
      }

      if (nextUrl.pathname.includes("dashboard") && isCookieCommodity == false) {
        
        return NextResponse.redirect(new URL("/komoditas", req.url))
      }

      if (isCookieCommodity) {
        if (nextUrl.pathname == "/komoditas") {
          return NextResponse.redirect(new URL("/", req.url))
        }
        return NextResponse.next()
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
  matcher: ["/", "/login", "/komoditas", "/dashboard/:path*", "/api/v1/:path*"],
}
