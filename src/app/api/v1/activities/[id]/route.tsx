import { authOptions } from "@/app/server/auth"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  const activityId = params.id

  const baseUrl = process.env.BASE_API_EXT_URL

  if (activityId) {
    const response = await fetch(`${baseUrl}/activity/${activityId}`, {
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  const baseUrl = process.env.BASE_API_EXT_URL
  const activityId = params.id

  if (activityId) {
    const body = await req.json()

    const response = await fetch(`${baseUrl}/activity/update/${activityId}`, {
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
        status: response.status,
        message: response.statusText,
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

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const session = await getServerSession(authOptions)
    const baseUrl = process.env.BASE_API_EXT_URL
    const activityId = params.id
  
    if (activityId) {
      const response = await fetch(`${baseUrl}/activity/delete/${activityId}`, {
        method: "DELETE",
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
          },
          {
            status: body.status,
            statusText: body.message,
          }
        )
      }
  
      return Response.json(
        {
          status: response.status,
          message: response.statusText,
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
