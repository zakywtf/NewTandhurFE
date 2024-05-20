"use client"

import { convertToIndonesiaTanggal } from "@/helpers/helper"
import { getActivityDashboard } from "@/helpers/libs/features/actions/dashboardAction"
import {
  useAppDispatch,
  useAppSelector,
  useCommodity,
  useFarmer,
} from "@/helpers/libs/hooks"
import { ChevronDoubleLeftIcon } from "@heroicons/react/solid"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import HarvestLineChart from "../ui/charts/HarvestChart"
import IncomeLineChart from "../ui/charts/IncomeChart"
import OutcomeLineChart from "../ui/charts/OutcomeChart"
import MenuDropdown from "../ui/dropdowns/MenuDropdown"
import Loading from "../ui/loading"

export default function Page() {
  const commodity = useCommodity()
  const router = useRouter()
  const farmer = useFarmer()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (commodity) {
      setIsLoading(false)
    }
  }, [commodity])

  return (
    <div className="flex flex-col gap-2">
      <Loading show={isLoading} />
      <h1 className="text-3xl font-semibold mt-10">
        Komoditas {commodity == null ? "Belum Dipilih" : commodity.name}
      </h1>
      <h2 className="text-2xl font-semibold mt-2">{farmer == null ? "Petani Belum Dipilih" : `Petani ${farmer}`}</h2>
      <div
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-lg mt-2 text-tand-1 cursor-pointer"
      >
        <ChevronDoubleLeftIcon className="w-5 h-5 text-tand-2" />
        Kembali Pilih Petani
      </div>
      <HarvestLineChart />
      <IncomeLineChart />
      <OutcomeLineChart />
    </div>
  )
}
