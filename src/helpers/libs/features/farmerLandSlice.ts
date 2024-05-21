import { INIT } from "@/helpers/const"
import { createFarmerLand, getFarmers } from "@/helpers/helper"
import { Payload } from "@/interfaces/payload"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface FarmerLandState {
  type: string
  status: {
    success: boolean
    message: string | null
  }
  data: any[],
  total_item: number
}

interface FarmerLandPayload extends Omit<Payload, 'data'> {
  data: {
    items: any[],
    total_item: number
  }
} 

const initialState: FarmerLandState = {
  type: INIT,
  status: {
    success: false,
    message: null,
  },
  data: [],
  total_item: 0
}

const farmerLandSlicer = createSlice({
  name: "farmerland",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        createFarmerLand.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
        }
      )
      .addCase(
        getFarmers.fulfilled,
        (state, action: PayloadAction<FarmerLandPayload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.data = action.payload.data.items
          state.total_item = action.payload.data.total_item
        }
      )
  },
})

export default farmerLandSlicer.reducer
