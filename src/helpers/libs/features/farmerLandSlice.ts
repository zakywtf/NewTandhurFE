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
  data: any[]
}

const initialState: FarmerLandState = {
  type: INIT,
  status: {
    success: false,
    message: null,
  },
  data: [],
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
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.data = action.payload.data ?? []
        }
      )
  },
})

export default farmerLandSlicer.reducer
