import { authOptions } from "@/app/server/auth"
import { getServerSession } from "next-auth"
import { NextRequest } from "next/server"

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const session = await getServerSession(authOptions)
    const baseUrl = process.env.BASE_API_EXT_URL
    const harvestId = params.id
  
    if (harvestId) {
        
      const response = await fetch(`${baseUrl}/harvest/stop-cultivation/${harvestId}`, {
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