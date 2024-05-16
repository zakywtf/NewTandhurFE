import { authOptions } from "@/app/server/auth"
import { getCookie } from "cookies-next"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)

  const baseUrl = process.env.BASE_API_EXT_URL
  const response = await fetch(`${baseUrl}/master/provinsi`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  })

  if (response.ok) {
    const data = await response.json()

    return Response.json(data)
  }

  return Response.json(
    {
      status: 500,
      message: "failed",
    },
    {
      status: 500,
      statusText: "failed",
    }
  )
}
