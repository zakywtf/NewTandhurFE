import { CREATE_ACTIVITY, GET_ALL_ACTIVITY, GET_ALL_ACTIVITY_TYPE } from "@/helpers/const"
import { FormActivityData } from "@/interfaces/FormActivity"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getActivities = createAsyncThunk(
  GET_ALL_ACTIVITY,
  async (farmerLandId: string) => {
    const getAll = async (farmerLandId: string) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/activities?farmer_land_id=${farmerLandId}`
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

    const response = await getAll(farmerLandId)

    return response
  }
)

export const getActivityTypes = createAsyncThunk(
    GET_ALL_ACTIVITY_TYPE,
    async () => {
      const getAll = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/activities/types`
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
    }
  )

export const createActivity = createAsyncThunk(
  CREATE_ACTIVITY,
  async (data: FormActivityData) => {
    const create = async (data: FormActivityData) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/activities?farmer_land_id=${data.farmer_land_id}`

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          type_activity: data.type_activity?.id ?? null,
          activity_date: data.activity_date,
          operating_costs: data.operating_costs,
          treatment: data.treatment,
          amount: data.amount,
          unit: data.unit?.id ?? null,
          brand: data.brand,
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
