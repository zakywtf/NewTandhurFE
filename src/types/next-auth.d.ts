import { DefaultSession, User } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends User {
    role: string
    access_token: string
  }

  interface Session extends DefaultSession {
    user: {
      user_id: string
      role: string
      access_token: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT extends JWT {
    user_id: string
    role: string
    access_token: string
  }
}
