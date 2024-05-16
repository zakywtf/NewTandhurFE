import { INIT } from "@/helpers/const"
import {
  getMasterDesa,
  getMasterKabupaten,
  getMasterKecamatan,
  getMasterProvinsi,
} from "@/helpers/helper"
import { Payload } from "@/interfaces/payload"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

interface RegionState {
  type: string
  status: {
    success: boolean
    message: string | null
  }
  data: any[]
}

const initialState: RegionState = {
  type: INIT,
  status: {
    success: false,
    message: null,
  },
  data: [],
}

export const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getMasterProvinsi.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.data = action.payload.data ?? []
        }
      )
      .addCase(
        getMasterKabupaten.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.data = action.payload.data ?? []
        }
      )
      .addCase(
        getMasterKecamatan.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.data = action.payload.data ?? []
        }
      )
      .addCase(
        getMasterDesa.fulfilled,
        (state, action: PayloadAction<Payload>) => {
          state.type = action.type
          state.status = { ...action.payload.status }
          state.data = action.payload.data ?? []
        }
      )
  },
})

export default regionSlice.reducer
