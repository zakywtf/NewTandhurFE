import { INIT } from "@/helpers/const"
import { Payload } from "@/interfaces/payload"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { createFarmer, getFarmers } from "./actions/farmerAction"

interface FarmerState {
  type: string
  status: {
    success: boolean
    message: string | null
  }
  data: any[]
}

const initialState: FarmerState = {
  type: INIT,
  status: {
    success: false,
    message: null,
  },
  data: [],
}

const farmerSlicer = createSlice({
  name: "farmer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        createFarmer.fulfilled,
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

export default farmerSlicer.reducer
