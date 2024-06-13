import { INIT } from "@/helpers/const"
import { Payload } from "@/interfaces/payload"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { getGuide } from "./actions/guideAction"

interface GuideState {
  type: string
  status: {
    success: boolean
    message: string | null
  }
  data: any[]
}

const initialState: GuideState = {
  type: INIT,
  status: {
    success: false,
    message: null,
  },
  data: [],
}

const guideSlicer = createSlice({
  name: "guide",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getGuide.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.data = action.payload.data ?? []
        }
      )
  },
})

export default guideSlicer.reducer
