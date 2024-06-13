import { INIT } from "@/helpers/const"
import { Payload } from "@/interfaces/payload"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { createCycle, getCycles, stopCycle } from "./actions/cycleAction"

interface CycleState {
  type: string
  status: {
    success: boolean
    message: string | null
  }
  data: any[]
}

const initialState: CycleState = {
  type: INIT,
  status: {
    success: false,
    message: null,
  },
  data: [],
}

const cycleSlicer = createSlice({
  name: "cycle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getCycles.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.data = action.payload.data ?? []
        }
      )
      .addCase(
        createCycle.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
        }
      )
      .addCase(
        stopCycle.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.data = []
        }
      )
  },
})

export default cycleSlicer.reducer
