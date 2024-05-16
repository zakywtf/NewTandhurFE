import { INIT } from "@/helpers/const"
import { Payload } from "@/interfaces/payload"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  getHarvestDashboard,
  getIncomeDashboard,
  getOutcomeDashboard,
} from "./actions/dashboardAction"
import { getHistoryActivities, getHistoryCosts, getHistoryHarvests, getHistoryIncomes } from "./actions/historyAction"

type CostData = {
  name: string
  amount: number
}

interface HistoryData {
  harvest: {name: string, amount: number}[]
  total: 0
}

interface PayloadHistoryHarvest extends Omit<Payload, 'data'> {
  data: HistoryData
}

interface HistoryState {
  type: string
  status: {
    success: boolean
    message: string | null
  }
  activities: any[]
  incomes: any[]
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
  incomes: [],
  costs: [],
  harvests: {
    harvest: [],
    total: 0
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
          state.activities = action.payload.data ? [] : action.payload.data!
        }
      )
      .addCase(
        getHistoryCosts.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.costs =  action.payload.data == null ? action.payload.data! : action.payload.data
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
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.incomes = action.payload.data ?? []
        }
      )
  },
})

export default dashboardSlicer.reducer
