import { INIT } from "@/helpers/const"
import {
  createFarmerLand,
  createHarvest,
  getFarmers,
  getHarvests,
} from "@/helpers/helper"
import { Payload } from "@/interfaces/payload"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { getHarvestById, updateHarvest } from "./actions/harvestAction"

interface HarvestState {
  type: string
  status: {
    success: boolean
    message: string | null
  }
  data: any[]
  detail: any | null
}

const initialState: HarvestState = {
  type: INIT,
  status: {
    success: false,
    message: null,
  },
  data: [],
  detail: null,
}

const harvestSlicer = createSlice({
  name: "harvest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getHarvests.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.data = action.payload.data ?? []
        }
      )
      .addCase(
        createHarvest.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
        }
      )
      .addCase(
        getHarvestById.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.detail = action.payload.data ?? null
        }
      )
      .addCase(
        updateHarvest.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
        }
      )
  },
})

export default harvestSlicer.reducer
