import { useDispatch, useSelector, useStore } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"
import type { RootState, AppDispatch, AppStore } from "./store"
import { useEffect, useState } from "react"
import { getCookie } from "cookies-next"

export const useFarmer = () => {
  const [farmer, setFarmer] = useState<{
    farmerLand: string
    farmerName: string
  } | null>(null)

  useEffect(() => {
    let farmer: any = getCookie("farmer") ?? null
    if (farmer) {
      const jsonObj = JSON.parse(farmer)
      setFarmer(jsonObj)
    }
  }, [])

  return farmer
}

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
