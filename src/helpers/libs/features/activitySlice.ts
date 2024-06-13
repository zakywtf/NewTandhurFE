import { INIT } from "@/helpers/const"
import { Payload } from "@/interfaces/payload"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  createActivity,
  deleteActivity,
  getActivities,
  getActivityTypes,
  getActivitytById,
  updateActivity,
} from "./actions/activityAction"
import { createCycle } from "./actions/cycleAction"

interface ActivityState {
  type: string
  status: {
    success: boolean
    message: string | null
  }
  data: any[]
  detail: any | null
  types: any[]
}

const initialState: ActivityState = {
  type: INIT,
  status: {
    success: false,
    message: null,
  },
  data: [],
  detail: null,
  types: [],
}

const activitySlicer = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        createActivity.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
        }
      )
      .addCase(
        getActivities.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.data = action.payload.data ?? []
        }
      )
      .addCase(
        getActivityTypes.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.types = action.payload.data ?? []
        }
      )
      .addCase(
        getActivitytById.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.detail = action.payload.data ?? null
        }
      )
      .addCase(
        updateActivity.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
        }
      )
      .addCase(
        deleteActivity.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
        }
      )
      .addCase(
        createCycle.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
        }
      )
  },
})

export default activitySlicer.reducer
