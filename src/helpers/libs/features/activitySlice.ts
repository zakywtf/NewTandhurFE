import { INIT } from "@/helpers/const"
import { Payload } from "@/interfaces/payload"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  createActivity,
  getActivities,
  getActivityTypes,
} from "./actions/activityAction"

interface ActivityState {
  type: string
  status: {
    success: boolean
    message: string | null
  }
  data: any[]
  types: any[]
}

const initialState: ActivityState = {
  type: INIT,
  status: {
    success: false,
    message: null,
  },
  data: [],
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
  },
})

export default activitySlicer.reducer
