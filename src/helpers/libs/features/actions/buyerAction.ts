import { CREATE_BUYER, GET_ALL_BUYER } from "@/helpers/const"
import { FormBuyerData } from "@/interfaces/FormBuyer"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getBuyers = createAsyncThunk(GET_ALL_BUYER, async () => {
  const getAll = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/buyers`
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

export const createBuyer = createAsyncThunk(
  CREATE_BUYER,
  async (data: FormBuyerData) => {
    const create = async (data: FormBuyerData) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/buyers`

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          agency: data.agency,
          name: data.name,
          phone: data.phone,
          province: data.province,
          regencies: data.regencies,
          district: data.district,
          village: data.village,
        }),
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
        }
      }

      return {
        status: {
          success: false,
          message: "failed",
        },
      }
    }

    const response = await create(data)

    return response
  }
)
