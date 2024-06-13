import { INIT } from "@/helpers/const"
import { Payload } from "@/interfaces/payload"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  getActivityDashboard,
  getHarvestDashboard,
  getIncomeDashboard,
  getOutcomeDashboard,
  getSummaryDashboard,
} from "./actions/dashboardAction"

interface HarvestData {
  x: string
  y: number
}

interface ActivityData {
  activity_name: string
  activity_date: string
}

interface DashboardState {
  type: string
  status: {
    success: boolean
    message: string | null
  }
  harvest_data: HarvestData[]
  income_data: HarvestData[]
  outcome_data: HarvestData[]
  activity_data: ActivityData[]
  summary_data: {
    farmer_land: string
    farmer_name: string
    chart_harvests: any[]
    chart_incomes: any[]
    chart_operation_costs: any[]
  } | null
}

const initialState: DashboardState = {
  type: INIT,
  status: {
    success: false,
    message: null,
  },
  harvest_data: [],
  income_data: [],
  outcome_data: [],
  activity_data: [],
  summary_data: null
}

const dashboardSlicer = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getHarvestDashboard.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.harvest_data = action.payload.data ?? []
        }
      )
      .addCase(
        getIncomeDashboard.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.income_data = action.payload.data ?? []
        }
      )
      .addCase(
        getOutcomeDashboard.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.outcome_data = action.payload.data ?? []
        }
      )
      .addCase(
        getActivityDashboard.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.activity_data = action.payload.data ?? []
        }
      )
      .addCase(
        getSummaryDashboard.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.summary_data = action.payload.data
        }
      )
  },
})

export default dashboardSlicer.reducer
