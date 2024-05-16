import { INIT } from "@/helpers/const"
import { Payload } from "@/interfaces/payload"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { createSell, getSellById, getSells, updateSell } from "./actions/sellingAction"

interface SellState {
  type: string
  status: {
    success: boolean
    message: string | null
  }
  data: any[]
  detail: any | null
}

const initialState: SellState = {
  type: INIT,
  status: {
    success: false,
    message: null,
  },
  data: [],
  detail: null,
}

const sellingSlicer = createSlice({
  name: "sell",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getSells.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.data = action.payload.data ?? []
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
