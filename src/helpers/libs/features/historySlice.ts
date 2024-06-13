import { INIT } from "@/helpers/const"
import { Payload } from "@/interfaces/payload"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  getActiveCycle,
  getCompleteCycles
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

interface HistoryCyclePayload extends Omit<Payload, 'data'> {
  data: {
    items: any[],
    total_item: number
  }
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
  data: any | null
  complete_cycles: any[]
  total_item: number
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
  data: null,
  complete_cycles: [],
  total_item: 0
}

const dashboardSlicer = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getActiveCycle.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.data = action.payload.data ?? null
        }
      )
      .addCase(
        getCompleteCycles.fulfilled,
        (state, action: PayloadAction<HistoryCyclePayload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.complete_cycles = action.payload.data.items
          state.total_item = action.payload.data.total_item
        }
      )
  },
})

export default dashboardSlicer.reducer
