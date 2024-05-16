import { ResponseBase } from "@/types/ResponseType"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, res: NextResponse) {
  const baseUrl = process.env.BASE_API_EXT_URL

  const body = await req.json()

  const response = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
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
      status: 500,
      message: response.statusText,
    },
    {
      status: 500,
      statusText: response.statusText,
    }
  )
}
