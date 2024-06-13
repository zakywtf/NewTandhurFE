import { CREATE_CYCLE, GET_ALL_CYCLE, STOP_CYCLE } from "@/helpers/const"
import { FormSiklusData } from "@/interfaces/FormSiklus"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getCycles = createAsyncThunk(GET_ALL_CYCLE, async () => {
  const getAll = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/cycles`
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

export const createCycle = createAsyncThunk(
  CREATE_CYCLE,
  async (data: FormSiklusData) => {
    const create = async (data: FormSiklusData) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/cycles?farmer_land_id=${data.farmer_land_id}`

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          commodity_id: data.commodity_id._id,
          farmer_id: data.farmer_id._id,
          cultivation_guide: data.cultivation_guide._id,
          start_date: data.start_date,
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

export const stopCycle = createAsyncThunk(
  STOP_CYCLE,
  async () => {
    const stop = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/cycles/stop-cycle`

      const res = await fetch(url, {
        method: "PUT",
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

    const response = await stop()

    return response
  }
)
