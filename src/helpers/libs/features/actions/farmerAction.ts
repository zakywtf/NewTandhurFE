import { CREATE_FARMER, GET_ALL_FARMER } from "@/helpers/const"
import { FormFarmerData } from "@/interfaces/FormFarmer"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getFarmers = createAsyncThunk(GET_ALL_FARMER, async () => {
  const getAll = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/farmers`
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

export const createFarmer = createAsyncThunk(
  CREATE_FARMER,
  async (data: FormFarmerData) => {
    const create = async (data: FormFarmerData) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/farmers`

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          nik: data.nik,
          name: data.name,
          address: data.address,
          phone: data.phone,
          gender: data.gender.id,
          date_of_birth: data.date_of_birth,
          age: data.age as number,
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
