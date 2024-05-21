import { INIT } from "@/helpers/const"
import {
  createFarmerLand,
  createHarvest,
  getFarmers,
  getHarvests,
} from "@/helpers/helper"
import { Payload } from "@/interfaces/payload"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { getHarvestById, stopHarvest, updateHarvest } from "./actions/harvestAction"

interface HarvestState {
  type: string
  status: {
    success: boolean
    message: string | null
  }
  data: any[]
  detail: any | null
  total_item: number
}

interface HarvestPayload extends Omit<Payload, 'data'> {
  data: {
    items: any[],
    total_item: number
  }
} 

const initialState: HarvestState = {
  type: INIT,
  status: {
    success: false,
    message: null,
  },
  data: [],
  detail: null,
  total_item: 0,
}

const harvestSlicer = createSlice({
  name: "harvest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getHarvests.fulfilled,
        (state, action: PayloadAction<HarvestPayload>) => {
          state.type = action.type
          state.data = action.payload.data.items
          state.total_item = action.payload.data.total_item
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
      .addCase(
        stopHarvest.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
        }
      )
  },
})

export default harvestSlicer.reducer
