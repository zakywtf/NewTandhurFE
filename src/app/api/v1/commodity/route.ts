import { authOptions } from "@/app/server/auth"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)

  const baseUrl = process.env.BASE_API_EXT_URL
  const ressponse = await fetch(`${baseUrl}/commodity`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  })

  const body = await ressponse.json()

  return Response.json(body)
}
