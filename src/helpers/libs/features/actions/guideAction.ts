import { GET_ALL_GUIDE } from "@/helpers/const"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getGuide = createAsyncThunk(
    GET_ALL_GUIDE,
    async (commodityID: string) => {
      const getById = async (commodityID: string) => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/cultivation-guide?commodity_id=${commodityID}`
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
            data: data.data ? data.data : null,
          }
        }
  
        return {
          status: {
            success: false,
            message: "failed",
          },
          data: null,
        }
      }
  
      const response = await getById(commodityID)
  
      return response
    }
  )