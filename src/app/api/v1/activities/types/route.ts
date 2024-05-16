import { authOptions } from "@/app/server/auth"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)
  const baseUrl = process.env.BASE_API_EXT_URL

  const response = await fetch(`${baseUrl}/activity/types/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  })

  if (response.ok) {
    const body = await response.json()

    if (body.status == 200) {
      return Response.json(body)
    }

    return Response.json(
      {
        status: body.status,
        message: body.message,
      },
      {
        status: body.status,
        statusText: body.message,
      }
    )
  }

  return Response.json(
    {
      status: response.status,
      message: response.statusText,
    },
    {
      status: response.status,
      statusText: response.statusText,
    }
  )
}
