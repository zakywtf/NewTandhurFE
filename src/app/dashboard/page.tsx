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
      <ActivityTable />
    </div>
  )
}

const ActivityTable: React.FC = () => {
  const { type, status, activity_data } = useAppSelector(
    (state) => state.dashboard
  )
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  return (
    <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
      <div className="flex flex-row">
        <span className="font-semibold text-lg text-tand-appr-1 pr-6 border-r-[1px] border-[#EEEEEE] mr-4">
          List Kegiatan Terkini
        </span>
        <MenuDropdown
          items={[
            { id: "year", name: "Per Tahun" },
            { id: "month", name: "Per Bulan" },
          ]}
          onChange={(selectedItem) => {
            const farmerLandId = searchParams.get("farmer_land_id") ?? ""
            dispatch(
              getActivityDashboard({
                farmer_land_id: farmerLandId,
                category_time: selectedItem.id,
              })
            )
          }}
        />
      </div>
      <div className="flex flex-wrap">
        <span className="w-2/4 text-lg">Nama Kegiatan</span>
        <span className="w-2/4 text-lg">Tanggal Kegiatan</span>
        {activity_data.map((activity) => {
          return (
            <>
              <span key={crypto.randomUUID()} className="w-2/4">
                {activity.activity_name}
              </span>
              <span key={crypto.randomUUID()} className="w-2/4">
                {convertToIndonesiaTanggal(activity.activity_date)}
              </span>
            </>
          )
        })}
      </div>
    </div>
  )
}
