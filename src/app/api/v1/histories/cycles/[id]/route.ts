import { authOptions } from "@/app/server/auth"
import { getServerSession } from "next-auth"
import { NextRequest } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  const cycleId = params.id

  const baseUrl = process.env.BASE_API_EXT_URL

  if (cycleId) {
    const response = await fetch(`${baseUrl}/history/filter/cycle/${cycleId}`, {
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
          data: null,
        },
        {
          status: body.status,
          statusText: body.message,
        }
      )
    }

    return Response.json(
      {
        status: 500,
        message: "failed",
        data: null,
      },
      {
        status: 500,
        statusText: "failed",
      }
    )
  }

  return Response.json(
    {
      status: 500,
      message: "failed",
      data: null,
    },
    {
      status: 500,
      statusText: "failed",
    }
  )
}
