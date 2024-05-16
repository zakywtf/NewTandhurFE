import { authOptions } from "@/app/server/auth"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)
  const { searchParams } = new URL(req.url)
  const id_kabupaten = searchParams.get("id_kabupaten")
  const baseUrl = process.env.BASE_API_EXT_URL
  if (id_kabupaten) {
    const response = await fetch(
      `${baseUrl}/master/kecamatan?id_kabupaten=${id_kabupaten}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.access_token}`,
        },
      }
    )
    if (response.ok) {
      const data = await response.json()

      return Response.json(data)
    }

    return Response.json({
      status: 500,
      message: "failed",
    })
  }

  return Response.json({
    status: 500,
    message: "failed",
  })
}
