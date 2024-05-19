import { GET_HARVEST_BY_ID, STOP_HARVEST, UPDATE_HARVEST } from "@/helpers/const"
import { UpdateFormPanenData } from "@/interfaces/FormPanen"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getHarvestById = createAsyncThunk(
  GET_HARVEST_BY_ID,
  async (harvestId: string) => {
    const getById = async (harvestId: string) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/harvests/${harvestId}`
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

    const response = await getById(harvestId)

    return response
  }
)

export const updateHarvest = createAsyncThunk(
  UPDATE_HARVEST,
  async (data: UpdateFormPanenData) => {
    const create = async (data: UpdateFormPanenData) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/harvests/${data.harvest_id}`

      const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          name: data.name,
          operating_costs: data.operating_costs,
          harvest_date: data.harvest_date,
          unit: data.unit?.id ?? "null",
          amount: data.amount,
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

export const stopHarvest = createAsyncThunk(
  STOP_HARVEST,
  async (id: string) => {
    const stop = async (id: string) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/harvests/stop-cultivation/${id}`

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

    const response = await stop(id)

    return response
  }
)
