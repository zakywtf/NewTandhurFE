import { useDispatch, useSelector, useStore } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"
import type { RootState, AppDispatch, AppStore } from "./store"
import { SelectedCommodityType } from "@/types/types"
import { useEffect, useState } from "react"
import { getCookie } from "cookies-next"

export const useCommodity = () => {
  const [commodity, setCommodity] = useState<SelectedCommodityType | null>(null)

  useEffect(() => {
    let selectedCommodity: any = getCookie("selected-commodity") ?? null
    if (selectedCommodity) {
      const jsonObj = JSON.parse(selectedCommodity) as SelectedCommodityType
      setCommodity(jsonObj)
    }
  }, [])

  return commodity
}

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
