import { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 3,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: ({ token, user, account, profile }) => {
      if (account && account?.type == "credentials") {
        token.user_id = user.id
        token.access_token = user.access_token
        token.email = user.email
        token.name = user.name
        token.role = user.role
      }
      return token
    },
    session: ({ session, token, user }) => {
      session.user.access_token = token.access_token
      session.user.email = token.email
      session.user.name = token.name
      session.user.role = token.role
      session.user.user_id = token.user_id
      return session
    }
  },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials, req) => {
        const { username, password } = credentials as {
          username: string
          password: string
        }

        const baseUrl = process.env.BASE_API_EXT_URL

        const response = await fetch(`${baseUrl}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })

        const data = await response.json()

        return {
          id: data.data._id,
          name: data.data.name,
          email: data.data.email,
          role: data.data.role,
          access_token: data.data.token,
        }
      },
    }),
  ],
}
