import { INIT } from "@/helpers/const"
import { Payload } from "@/interfaces/payload"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { createBuyer, getBuyers } from "./actions/buyerAction"

interface BuyerState {
  type: string
  status: {
    success: boolean
    message: string | null
  }
  data: any[]
}

const initialState: BuyerState = {
  type: INIT,
  status: {
    success: false,
    message: null,
  },
  data: [],
}

const buyerSlicer = createSlice({
  name: "buyer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        createBuyer.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
        }
      )
      .addCase(
        getBuyers.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.data = action.payload.data ?? []
        }
      )
  },
})

export default buyerSlicer.reducer
