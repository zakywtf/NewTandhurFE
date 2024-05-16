"use client"

import MenuDropdown from "@/app/ui/dropdowns/MenuDropdown"
import Loading from "@/app/ui/loading"
import { convertToIndonesiaTanggal, priceSplitter } from "@/helpers/helper"
import {
  getHistoryCosts,
  getHistoryHarvests,
} from "@/helpers/libs/features/actions/historyAction"
import { useAppDispatch, useAppSelector } from "@/helpers/libs/hooks"
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid"
import moment from "moment"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

type RangeDate = {
  category: string
  startDate: string
  endDate: string
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <div className="mx-8 flex flex-col gap-2">
      <Loading show={isLoading} />
      <div className="flex justify-between mt-10">
        <h2 className="text-3xl font-semibold mt-2">Daftar Riwayat</h2>
      </div>

      <h3 className="font-semibold text-2xl text-center text-tand-appr-1 pr-6 border-r-[1px] border-[#EEEEEE] mr-4">
        List Kegiatan Terkini
      </h3>
      <ListActivity />
      <h3 className="font-semibold text-2xl text-center text-tand-appr-1 pr-6 border-r-[1px] border-[#EEEEEE] mr-4">
        Rekap Finansial
      </h3>
      <ListCost />
      <ListIncome />
      <h3 className="font-semibold text-2xl text-center text-tand-appr-1 pr-6 border-r-[1px] border-[#EEEEEE] mr-4">
        Rekap Hasil Panen
      </h3>
      <ListHarvest />
    </div>
  )
}

const ListActivity: React.FC = () => {
  const [rangeDate, setRangeDate] = useState<RangeDate | null>(null)

  const updateCategoryRange = (
    category: string | "week" | "month" | "year"
  ) => {
    const startDate = moment().format("YYYY-MM-DD")
    if (category == "week") {
      const endDate = moment().add(1, "week").format("YYYY-MM-DD")
      setRangeDate({
        category: category,
        startDate: startDate,
        endDate: endDate,
      })
    } else if (category == "month") {
      const endDate = moment().add(1, "month").format("YYYY-MM-DD")
      setRangeDate({
        category: category,
        startDate: startDate,
        endDate: endDate,
      })
    } else {
      const endDate = moment().add(1, "year").format("YYYY-MM-DD")
      setRangeDate({
        category: category,
        startDate: startDate,
        endDate: endDate,
      })
    }
  }

  const nextDate = () => {
    if (rangeDate) {
      if (rangeDate.category == "week") {
        const startDate = rangeDate.endDate
        const endDate = moment(startDate).add(1, "week").format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      } else if (rangeDate.category == "month") {
        const startDate = rangeDate.endDate
        const endDate = moment(startDate).add(1, "month").format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      } else {
        const startDate = rangeDate.endDate
        const endDate = moment(startDate).add(1, "year").format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      }
    }
  }

  const previousDate = () => {
    if (rangeDate) {
      if (rangeDate.category == "week") {
        const endDate = rangeDate.startDate
        const startDate = moment(endDate)
          .subtract(1, "week")
          .format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      } else if (rangeDate.category == "month") {
        const endDate = rangeDate.startDate
        const startDate = moment(endDate)
          .subtract(1, "month")
          .format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      } else {
        const endDate = rangeDate.startDate
        const startDate = moment(endDate)
          .subtract(1, "year")
          .format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      }
    }
  }
  return (
    <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <ChevronDoubleLeftIcon
            onClick={previousDate}
            className="w-5 h-5 text-tand-2"
          />
          {rangeDate ? (
            <span className="text-tand-2">
              {convertToIndonesiaTanggal(rangeDate.startDate)} -{" "}
              {convertToIndonesiaTanggal(rangeDate.endDate)}
            </span>
          ) : null}
          <ChevronDoubleRightIcon
            onClick={nextDate}
            className="w-5 h-5 text-tand-2"
          />
        </div>
        <MenuDropdown
          items={[
            { id: "week", name: "Per Minggu" },
            { id: "month", name: "Per Bulan" },
            { id: "year", name: "Per Tahun" },
          ]}
          onChange={(value) => updateCategoryRange(value.id)}
        />
      </div>
      <div className="my-5 flex">
        <div className="flex flex-col flex-1">
          <span className="text-lg">Nama Kegiatan</span>
          <span>XXXX</span>
          <span>XXXX</span>
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-lg">Tanggal Kegiatan</span>
          <span>XXXX</span>
          <span>XXXX</span>
        </div>
      </div>
    </div>
  )
}

const ListCost: React.FC = () => {
  const { costs } = useAppSelector((state) => state.history)
  const searchParams = useSearchParams()
  const [rangeDate, setRangeDate] = useState<RangeDate | null>(null)
  const dispatch = useAppDispatch()

  const updateCategoryRange = (
    category: string | "week" | "month" | "year"
  ) => {
    const startDate = moment().format("YYYY-MM-DD")
    if (category == "week") {
      const endDate = moment().add(1, "week").format("YYYY-MM-DD")
      setRangeDate({
        category: category,
        startDate: startDate,
        endDate: endDate,
      })
    } else if (category == "month") {
      const endDate = moment().add(1, "month").format("YYYY-MM-DD")
      setRangeDate({
        category: category,
        startDate: startDate,
        endDate: endDate,
      })
    } else {
      const endDate = moment().add(1, "year").format("YYYY-MM-DD")
      setRangeDate({
        category: category,
        startDate: startDate,
        endDate: endDate,
      })
    }
  }

  const nextDate = () => {
    if (rangeDate) {
      if (rangeDate.category == "week") {
        const startDate = rangeDate.endDate
        const endDate = moment(startDate).add(1, "week").format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      } else if (rangeDate.category == "month") {
        const startDate = rangeDate.endDate
        const endDate = moment(startDate).add(1, "month").format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      } else {
        const startDate = rangeDate.endDate
        const endDate = moment(startDate).add(1, "year").format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      }
    }
  }

  const previousDate = () => {
    if (rangeDate) {
      if (rangeDate.category == "week") {
        const endDate = rangeDate.startDate
        const startDate = moment(endDate)
          .subtract(1, "week")
          .format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      } else if (rangeDate.category == "month") {
        const endDate = rangeDate.startDate
        const startDate = moment(endDate)
          .subtract(1, "month")
          .format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      } else {
        const endDate = rangeDate.startDate
        const startDate = moment(endDate)
          .subtract(1, "year")
          .format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      }
    }
  }

  useEffect(() => {
    const farmerLandId = searchParams.get("farmer_land_id")
    if (farmerLandId && rangeDate) {
      dispatch(
        getHistoryCosts({
          farmer_land_id: farmerLandId,
          start_date: rangeDate.startDate,
          end_date: rangeDate.endDate,
        })
      )
    }
  }, [rangeDate])

  return (
    <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
      <span className="font-semibold text-xl text-tand-appr-1">
        Total Biaya Operasional
      </span>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <ChevronDoubleLeftIcon
            onClick={previousDate}
            className="w-5 h-5 text-tand-2"
          />
          {rangeDate ? (
            <span className="text-tand-2">
              {convertToIndonesiaTanggal(rangeDate.startDate)} -{" "}
              {convertToIndonesiaTanggal(rangeDate.endDate)}
            </span>
          ) : null}
          <ChevronDoubleRightIcon
            onClick={nextDate}
            className="w-5 h-5 text-tand-2"
          />
        </div>
        <MenuDropdown
          items={[
            { id: "week", name: "Per Minggu" },
            { id: "month", name: "Per Bulan" },
            { id: "year", name: "Per Tahun" },
          ]}
          onChange={(value) => updateCategoryRange(value.id)}
        />
      </div>
      <div className="w-fit my-5 flex flex-col">
        <div className="flex flex-col flex-1">
          {costs.map((cost) => {
            return (
              <span key={crypto.randomUUID()} className="capitalize">
                {" "}
                {cost.name} : Rp. {priceSplitter(cost.amount.toString())}
              </span>
            )
          })}
        </div>
        <div className="w-full h-[1px] bg-[#000] my-4" />
        <span>
          Total Biaya : Rp.{" "}
          {priceSplitter(
            costs
              .reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.amount,
                0
              )
              .toString()
          )}
        </span>
      </div>
    </div>
  )
}

const ListIncome: React.FC = () => {
  const [rangeDate, setRangeDate] = useState<RangeDate | null>(null)

  const updateCategoryRange = (
    category: string | "week" | "month" | "year"
  ) => {
    const startDate = moment().format("YYYY-MM-DD")
    if (category == "week") {
      const endDate = moment().add(1, "week").format("YYYY-MM-DD")
      setRangeDate({
        category: category,
        startDate: startDate,
        endDate: endDate,
      })
    } else if (category == "month") {
      const endDate = moment().add(1, "month").format("YYYY-MM-DD")
      setRangeDate({
        category: category,
        startDate: startDate,
        endDate: endDate,
      })
    } else {
      const endDate = moment().add(1, "year").format("YYYY-MM-DD")
      setRangeDate({
        category: category,
        startDate: startDate,
        endDate: endDate,
      })
    }
  }

  const nextDate = () => {
    if (rangeDate) {
      if (rangeDate.category == "week") {
        const startDate = rangeDate.endDate
        const endDate = moment(startDate).add(1, "week").format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      } else if (rangeDate.category == "month") {
        const startDate = rangeDate.endDate
        const endDate = moment(startDate).add(1, "month").format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      } else {
        const startDate = rangeDate.endDate
        const endDate = moment(startDate).add(1, "year").format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      }
    }
  }

  const previousDate = () => {
    if (rangeDate) {
      if (rangeDate.category == "week") {
        const endDate = rangeDate.startDate
        const startDate = moment(endDate)
          .subtract(1, "week")
          .format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      } else if (rangeDate.category == "month") {
        const endDate = rangeDate.startDate
        const startDate = moment(endDate)
          .subtract(1, "month")
          .format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      } else {
        const endDate = rangeDate.startDate
        const startDate = moment(endDate)
          .subtract(1, "year")
          .format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      }
    }
  }
  return (
    <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
      <span className="font-semibold text-xl text-tand-appr-1">
        Total Pendapatan
      </span>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <ChevronDoubleLeftIcon
            onClick={previousDate}
            className="w-5 h-5 text-tand-2"
          />
          {rangeDate ? (
            <span className="text-tand-2">
              {convertToIndonesiaTanggal(rangeDate.startDate)} -{" "}
              {convertToIndonesiaTanggal(rangeDate.endDate)}
            </span>
          ) : null}
          <ChevronDoubleRightIcon
            onClick={nextDate}
            className="w-5 h-5 text-tand-2"
          />
        </div>
        <MenuDropdown
          items={[
            { id: "week", name: "Per Minggu" },
            { id: "month", name: "Per Bulan" },
            { id: "year", name: "Per Tahun" },
          ]}
          onChange={(value) => updateCategoryRange(value.id)}
        />
      </div>
      <div className="w-fit my-5 flex flex-col">
        <div className="flex flex-col flex-1">
          <span>Biaya Operasional X : Rp. 200.000</span>
          <span>Penjualan : Rp. 200.000</span>
        </div>
        <div className="w-full h-[1px] bg-[#000] my-4" />
        <span>Total Pendapatan : Rp. 200.000</span>
      </div>
    </div>
  )
}

const ListHarvest: React.FC = () => {
  const { harvests } = useAppSelector((state) => state.history)
  const searchParams = useSearchParams()
  const [rangeDate, setRangeDate] = useState<RangeDate | null>(null)
  const dispatch = useAppDispatch()

  const updateCategoryRange = (
    category: string | "week" | "month" | "year"
  ) => {
    const startDate = moment().format("YYYY-MM-DD")
    if (category == "week") {
      const endDate = moment().add(1, "week").format("YYYY-MM-DD")
      setRangeDate({
        category: category,
        startDate: startDate,
        endDate: endDate,
      })
    } else if (category == "month") {
      const endDate = moment().add(1, "month").format("YYYY-MM-DD")
      setRangeDate({
        category: category,
        startDate: startDate,
        endDate: endDate,
      })
    } else {
      const endDate = moment().add(1, "year").format("YYYY-MM-DD")
      setRangeDate({
        category: category,
        startDate: startDate,
        endDate: endDate,
      })
    }
  }

  const nextDate = () => {
    if (rangeDate) {
      if (rangeDate.category == "week") {
        const startDate = rangeDate.endDate
        const endDate = moment(startDate).add(1, "week").format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      } else if (rangeDate.category == "month") {
        const startDate = rangeDate.endDate
        const endDate = moment(startDate).add(1, "month").format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      } else {
        const startDate = rangeDate.endDate
        const endDate = moment(startDate).add(1, "year").format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      }
    }
  }

  const previousDate = () => {
    if (rangeDate) {
      if (rangeDate.category == "week") {
        const endDate = rangeDate.startDate
        const startDate = moment(endDate)
          .subtract(1, "week")
          .format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      } else if (rangeDate.category == "month") {
        const endDate = rangeDate.startDate
        const startDate = moment(endDate)
          .subtract(1, "month")
          .format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      } else {
        const endDate = rangeDate.startDate
        const startDate = moment(endDate)
          .subtract(1, "year")
          .format("YYYY-MM-DD")
        const currentDate = { ...rangeDate }
        currentDate.startDate = startDate
        currentDate.endDate = endDate
        setRangeDate(currentDate)
      }
    }
  }

  useEffect(() => {
    const farmerLandId = searchParams.get("farmer_land_id")
    if (farmerLandId && rangeDate) {
      dispatch(
        getHistoryHarvests({
          farmer_land_id: farmerLandId,
          start_date: rangeDate.startDate,
          end_date: rangeDate.endDate,
        })
      )
    }
  }, [rangeDate])

  return (
    <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <ChevronDoubleLeftIcon
            onClick={previousDate}
            className="w-5 h-5 text-tand-2"
          />
          {rangeDate ? (
            <span className="text-tand-2">
              {convertToIndonesiaTanggal(rangeDate.startDate)} -{" "}
              {convertToIndonesiaTanggal(rangeDate.endDate)}
            </span>
          ) : null}
          <ChevronDoubleRightIcon
            onClick={nextDate}
            className="w-5 h-5 text-tand-2"
          />
        </div>
        <MenuDropdown
          items={[
            { id: "week", name: "Per Minggu" },
            { id: "month", name: "Per Bulan" },
            { id: "year", name: "Per Tahun" },
          ]}
          onChange={(value) => updateCategoryRange(value.id)}
        />
      </div>
      <div className="w-fit my-5 flex flex-col">
        <div className="flex flex-col flex-1">
          {harvests.harvest.map((harvest) => {
            return (
              <span key={crypto.randomUUID()} className="capitalize">
                {" "}
                {harvest.name} : {harvest.amount} Kg
              </span>
            )
          })}
        </div>
        <div className="w-full h-[1px] bg-[#000] my-4" />
        <span>Total Hasil Panen : {harvests.total} Ton</span>
      </div>
    </div>
  )
}
