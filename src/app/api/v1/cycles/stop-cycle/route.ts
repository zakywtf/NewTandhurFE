import { authOptions } from "@/app/server/auth"
import { getServerSession } from "next-auth"
import { NextRequest } from "next/server"

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const baseUrl = process.env.BASE_API_EXT_URL

  const response = await fetch(`${baseUrl}/cycles/stop-cycle`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  })

  if (response.ok) {
    const body = await response.json()

    if (body.status == 200) {
      return Response.json(body)
    } else {
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
