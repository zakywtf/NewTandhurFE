import { authOptions } from "@/app/server/auth"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)
  const { searchParams } = new URL(req.url)
  const farmerLandId = searchParams.get("farmer_land_id")
  const page = searchParams.get("page") ?? 1
  const limit = searchParams.get("limit") ?? 10
  const baseUrl = process.env.BASE_API_EXT_URL

  if (farmerLandId) {
    const response = await fetch(
      `${baseUrl}/sellings/pagination/${page}/${limit}?farmer_land_id=${farmerLandId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.access_token}`,
        },
      }
    )

    if (response.ok) {
      const body = await response.json()

      if (body.status == 200) {
        return Response.json(body)
      }

      return Response.json(body, {
        status: body.status,
        statusText: body.message,
      })
    }

    return Response.json(
      {
        status: response.status,
        message: response.statusText,
        data: [],
      },
      {
        status: response.status,
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

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)
  const baseUrl = process.env.BASE_API_EXT_URL

  const { searchParams } = new URL(req.url)
  const farmerLandId = searchParams.get("farmer_land_id")

  if (farmerLandId) {
    const body = await req.formData()

    const response = await fetch(
      `${baseUrl}/sellings/create?farmer_land_id=${farmerLandId}`,
      {
        method: "POST",
        body: body,
        headers: {
          Authorization: `Bearer ${session?.user.access_token}`,
        },
      }
    )

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
