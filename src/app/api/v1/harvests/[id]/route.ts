import { authOptions } from "@/app/server/auth"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  const harvestId = params.id

  const baseUrl = process.env.BASE_API_EXT_URL

  if (harvestId) {
    const response = await fetch(`${baseUrl}/harvest/${harvestId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    })

    const body = await response.json()

    return Response.json(body)
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  const baseUrl = process.env.BASE_API_EXT_URL
  const harvestId = params.id

  if (harvestId) {
    const body = await req.json()

    const response = await fetch(`${baseUrl}/harvest/update/${harvestId}`, {
      method: "PUT",
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
