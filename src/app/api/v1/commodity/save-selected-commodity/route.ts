import { ResponseBase } from "@/types/ResponseType"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, res: NextResponse) {
  const commodity = await req.json()
  const cookie = cookies()
  cookie.set("selected-commodity", JSON.stringify(commodity), {
    maxAge: 60 * 60 * 24,
  })

  const response: ResponseBase<object> = {
    status: 200,
    message: "success",
    data: commodity,
  }

  return NextResponse.json(response)
}
