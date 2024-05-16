import { authOptions } from "@/app/server/auth"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)
  const { searchParams } = new URL(req.url)
  const id_kecamatan = searchParams.get("id_kecamatan")
  const baseUrl = process.env.BASE_API_EXT_URL
  if (id_kecamatan) {
    const response = await fetch(
      `${baseUrl}/master/desa?id_kecamatan=${id_kecamatan}`,
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
