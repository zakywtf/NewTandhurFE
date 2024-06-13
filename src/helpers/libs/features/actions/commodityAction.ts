import { GET_ALL_COMMODITY } from "@/helpers/const"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getCommodities = createAsyncThunk(GET_ALL_COMMODITY, async () => {
  const getAll = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/commodity`
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.status == 200) {
      const data = await res.json()

      return {
        status: {
          success: true,
          message: data.message,
        },
        data: data.data ? data.data : [],
      }
    }

    return {
      status: {
        success: false,
        message: "failed",
      },
      data: [],
    }
  }

  const response = await getAll()

  return response
})