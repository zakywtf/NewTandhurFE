import { authOptions } from "@/app/server/auth"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)
  const { searchParams } = new URL(req.url)
  const farmerLandId = searchParams.get("farmer_land_id")
  const startDate = searchParams.get("start_date")
  const endDate = searchParams.get("end_date")
  const baseUrl = process.env.BASE_API_EXT_URL

  if (farmerLandId && startDate && endDate) {
    const response = await fetch(
      `${baseUrl}/history/filter/operating-costs?farmer_land_id=${farmerLandId}&start_date=${startDate}&end_date=${endDate}`,
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
        return Response.json({
          status: 200,
          message: body.message,
          data: body.data.datas,
        })
      }

      if (body.status == 404) {
        return Response.json({
          status: body.status,
          message: body.message,
          data: null,
        })
      }

      return Response.json({
        status: body.status,
        message: body.message,
        data: null,
      })
    }

    return Response.json(
      {
        status: response.status,
        message: response.statusText,
        data: null,
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
      data: null,
    },
    {
      status: 500,
      statusText: "failed",
    }
  )
}
