import { INIT } from "@/helpers/const"
import { Payload } from "@/interfaces/payload"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { getCommodities } from "./actions/commodityAction"

interface CommodityState {
  type: string
  status: {
    success: boolean
    message: string | null
  }
  data: any[]
}

const initialState: CommodityState = {
  type: INIT,
  status: {
    success: false,
    message: null,
  },
  data: [],
}

const commoditySlicer = createSlice({
  name: "commodity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getCommodities.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.data = action.payload.data ?? []
        }
      )
  },
})

export default commoditySlicer.reducer
