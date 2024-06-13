import { authOptions } from "@/app/server/auth"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)

  const baseUrl = process.env.BASE_API_EXT_URL
  const response = await fetch(`${baseUrl}/buyers`, {
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
    } else if (body.status == 404) {
      return Response.json(
        {
          status: body.status,
          message: body.message,
          data: [],
        },
        {
          status: body.status,
          statusText: body.message,
        }
      )
    } else {
      return Response.json(
        {
          status: body.status,
          message: body.message,
          data: [],
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

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)
  const baseUrl = process.env.BASE_API_EXT_URL

  const body = await req.json()

  const response = await fetch(`${baseUrl}/buyers`, {
    method: "POST",
    body: JSON.stringify(body),
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
  } else {
    return Response.json(
      {
        status: 500,
        message: response.statusText,
      },
      {
        status: 500,
        statusText: response.statusText,
      }
    )
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
