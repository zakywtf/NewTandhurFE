import { INIT } from "@/helpers/const"
import { Payload } from "@/interfaces/payload"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  createSell,
  getSellById,
  getSells,
  updateSell,
} from "./actions/sellingAction"

interface SellState {
  type: string
  status: {
    success: boolean
    message: string | null
  }
  data: any[]
  detail: any | null
  total_item: number
}

interface SellPayload extends Omit<Payload, "data"> {
  data: {
    items: any[]
    total_item: number
  }
}

const initialState: SellState = {
  type: INIT,
  status: {
    success: false,
    message: null,
  },
  data: [],
  detail: null,
  total_item: 0,
}

const sellingSlicer = createSlice({
  name: "sell",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getSells.fulfilled,
        (state, action: PayloadAction<SellPayload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.data = action.payload.data.items
          state.total_item = action.payload.data.total_item
        }
      )
      .addCase(
        createSell.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
        }
      )
      .addCase(
        getSellById.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.detail = action.payload.data ?? null
        }
      )
      .addCase(
        updateSell.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
        }
      )
  },
})

export default sellingSlicer.reducer
