import { configureStore } from "@reduxjs/toolkit"
import regionSlice from "./features/regionSlice"
import farmerLandSlice from "./features/farmerLandSlice"
import harvestSlice from "./features/harvestSlice"
import activitySlice from "./features/activitySlice"
import sellingSlice from "./features/sellingSlice"
import dashboardSlice from "./features/dashboardSlice"
import historySlice from "./features/historySlice"

export const appStore = () => {
  return configureStore({
    reducer: {
      region: regionSlice,
      farmerland: farmerLandSlice,
      harvest: harvestSlice,
      activity: activitySlice,
      sell: sellingSlice,
      dashboard: dashboardSlice,
      history: historySlice
    },
  })
}

export type AppStore = ReturnType<typeof appStore>

export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
