import { INIT } from "@/helpers/const"
import { Payload } from "@/interfaces/payload"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  getHarvestDashboard,
  getIncomeDashboard,
  getOutcomeDashboard,
} from "./actions/dashboardAction"
import {
  getHistoryActivities,
  getHistoryCosts,
  getHistoryHarvests,
  getHistoryIncomes,
} from "./actions/historyAction"

type CostData = {
  name: string
  amount: number
}

type IncomeData = {
  total_sellings: number | null
  total_operating_costs: number | null
  total_incomes: number | null
}

interface HistoryData {
  harvest: { name: string; amount: number }[]
  total: 0
}

interface PayloadHistoryHarvest extends Omit<Payload, "data"> {
  data: HistoryData
}

interface PayloadHistoryIncome extends Omit<Payload, "data"> {
  data: IncomeData | null
}

interface HistoryState {
  type: string
  status: {
    success: boolean
    message: string | null
  }
  activities: any[]
  incomes: IncomeData | null
  costs: CostData[]
  harvests: HistoryData
}

const initialState: HistoryState = {
  type: INIT,
  status: {
    success: false,
    message: null,
  },
  activities: [],
  incomes: null,
  costs: [],
  harvests: {
    harvest: [],
    total: 0,
  },
}

const dashboardSlicer = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getHistoryActivities.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.activities = action.payload.data?.length == 0 ? [] : action.payload.data!
        }
      )
      .addCase(
        getHistoryCosts.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.costs =
            action.payload.data == null
              ? action.payload.data!
              : action.payload.data
        }
      )
      .addCase(
        getHistoryHarvests.fulfilled,
        (state, action: PayloadAction<PayloadHistoryHarvest>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.harvests = action.payload.data
        }
      )
      .addCase(
        getHistoryIncomes.fulfilled,
        (state, action: PayloadAction<PayloadHistoryIncome>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.incomes = action.payload.data ?? null
        }
      )
  },
})

export default dashboardSlicer.reducer
