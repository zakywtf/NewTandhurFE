import {
  GET_HISTORY_ACTIVITY,
  GET_HISTORY_COST,
  GET_HISTORY_HARVEST,
  GET_HISTORY_INCOME,
} from "@/helpers/const"
import { createAsyncThunk } from "@reduxjs/toolkit"

type HistoryFilter = {
  farmer_land_id: string
  start_date: string
  end_date: string
}

export const getHistoryActivities = createAsyncThunk(
  GET_HISTORY_ACTIVITY,
  async (filter: HistoryFilter) => {
    const get = async (filter: HistoryFilter) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/histories/activity?farmer_land_id=${filter.farmer_land_id}&start_date=${filter.start_date}&end_date=${filter.end_date}`
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
          data: data.data.length == 0 ? [] : data.data,
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

    const response = await get(filter)

    return response
  }
)

export const getHistoryHarvests = createAsyncThunk(
  GET_HISTORY_HARVEST,
  async (filter: HistoryFilter) => {
    const get = async (filter: HistoryFilter) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/histories/harvest?farmer_land_id=${filter.farmer_land_id}&start_date=${filter.start_date}&end_date=${filter.end_date}`
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
          data:
            data.data == null
              ? { harvest: [], total: 0 }
              : { harvest: data.data.datas, total: data.data.total },
        }
      }

      return {
        status: {
          success: false,
          message: "failed",
        },
        data: { harvest: [], total: 0 },
      }
    }

    const response = await get(filter)

    return response
  }
)

export const getHistoryIncomes = createAsyncThunk(
  GET_HISTORY_INCOME,
  async (filter: HistoryFilter) => {
    const get = async (filter: HistoryFilter) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/histories/income?farmer_land_id=${filter.farmer_land_id}&start_date=${filter.start_date}&end_date=${filter.end_date}`
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
          data: data.data.length == 0 ? [] : data.data,
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

    const response = await get(filter)

    return response
  }
)

export const getHistoryCosts = createAsyncThunk(
  GET_HISTORY_COST,
  async (filter: HistoryFilter) => {
    const get = async (filter: HistoryFilter) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/histories/cost?farmer_land_id=${filter.farmer_land_id}&start_date=${filter.start_date}&end_date=${filter.end_date}`
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
          data: data.data == null ? [] : data.data,
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

    const response = await get(filter)

    return response
  }
)
