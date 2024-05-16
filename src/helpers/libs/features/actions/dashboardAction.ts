import {
  GET_ACTIVITY_DASHBOARD,
  GET_HARVEST_DASHBOARD,
  GET_INCOME_DASHBOARD,
  GET_OUTCOME_DASHBOARD,
} from "@/helpers/const"
import { createAsyncThunk } from "@reduxjs/toolkit"

type DashboardFilter = {
  farmer_land_id: string
  category_time: string
}

export const getHarvestDashboard = createAsyncThunk(
  GET_HARVEST_DASHBOARD,
  async (filter: DashboardFilter) => {
    const get = async (filter: DashboardFilter) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/harvest?farmer_land_id=${filter.farmer_land_id}&filter=${filter.category_time}`
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

export const getIncomeDashboard = createAsyncThunk(
  GET_INCOME_DASHBOARD,
  async (filter: DashboardFilter) => {
    const get = async (filter: DashboardFilter) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/income?farmer_land_id=${filter.farmer_land_id}&filter=${filter.category_time}`
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

export const getOutcomeDashboard = createAsyncThunk(
  GET_OUTCOME_DASHBOARD,
  async (filter: DashboardFilter) => {
    const get = async (filter: DashboardFilter) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/outcome?farmer_land_id=${filter.farmer_land_id}&filter=${filter.category_time}`
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

export const getActivityDashboard = createAsyncThunk(
  GET_ACTIVITY_DASHBOARD,
  async (filter: DashboardFilter) => {
    const get = async (filter: DashboardFilter) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/activities?farmer_land_id=${filter.farmer_land_id}&filter=${filter.category_time}`
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
