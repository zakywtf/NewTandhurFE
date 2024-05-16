import { authOptions } from "@/app/server/auth"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)
  const cookie = cookies()
  const cookieCommodity = cookie.get("selected-commodity")

  if (cookieCommodity != undefined) {
    const baseUrl = process.env.BASE_API_EXT_URL
    const commodityJson = JSON.parse(cookieCommodity.value || "")
    const response = await fetch(
      `${baseUrl}/farmer-lands/pagination/1/10?commodity_id=${commodityJson.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.access_token}`,
        },
      }
    )

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

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)
  const cookie = cookies()
  const cookieCommodity = cookie.get("selected-commodity")
  const baseUrl = process.env.BASE_API_EXT_URL

  if (cookieCommodity != undefined) {
    const body =  await req.json()
    const commodityJson = JSON.parse(cookieCommodity.value || "")

    const response = await fetch(
      `${baseUrl}/farmer-lands?commodity_id=${commodityJson.id}`,
      {
        method: "POST",
        body: JSON.stringify(body),
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
