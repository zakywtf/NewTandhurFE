import { authOptions } from "@/app/server/auth"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(req.url)
    const commodityId = searchParams.get("commodity_id")
    const baseUrl = process.env.BASE_API_EXT_URL
  
    if (commodityId) {
      try {
        const response = await fetch(
          `${baseUrl}/cultivation-guide?commodity_id=${commodityId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.user.access_token}`,
            },
          }
        )
        const body = await response.json()

        const defaultItems = [
            {
                _id: "",
                name: "tidak ada panduan"
            }
        ]
  
        if (body.status == 200) {
          return Response.json(defaultItems.concat(body))
        }
  
        if (body.status == 404) {
          return Response.json({
            status: body.status,
            message: body.message,
            data: defaultItems
          })
        }
        
  
        return Response.json({
          status: body.status,
          message: body.message,
        })
      } catch (error) {
        return Response.json(
          {
            status: 500,
            message: error,
          },
          {
            status: 500,
            statusText: "failed",
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