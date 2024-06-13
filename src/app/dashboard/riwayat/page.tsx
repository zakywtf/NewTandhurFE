"use client"

import Alert from "@/app/ui/Alert"
import CardHistory from "@/app/ui/cards/CardHistory"
import MenuDropdown from "@/app/ui/dropdowns/MenuDropdown"
import Button from "@/app/ui/fields/Button"
import Loading from "@/app/ui/loading"
import CardPagination from "@/app/ui/paginations/CardPagination"
import {
  GET_ACTIVE_CYCLE_FULFILLED,
  GET_ALL_COMPLETE_CYCLE_FULFILLED,
} from "@/helpers/const"
import { convertToIndonesiaTanggal, priceSplitter } from "@/helpers/helper"
import { stopCycle } from "@/helpers/libs/features/actions/cycleAction"
import {
  getActiveCycle,
  getCompleteCycles,
  getHistoryActivities,
  getHistoryCosts,
  getHistoryHarvests,
  getHistoryIncomes,
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
  const searchParams = useSearchParams()
  const [showAlert, setShowAlert] = useState(false)
  const { type, status, data, complete_cycles, total_item } = useAppSelector(
    (state) => state.history
  )
  const { type: cycleType } = useAppSelector((state) => state.cycle)
  const [paginationData, setPaginationData] = useState<{
    page: number
    isHidden: boolean
    isMaxPage: boolean
    items: any[]
  }>({ page: 1, isHidden: true, isMaxPage: false, items: [] })
  const dispatch = useAppDispatch()

  const handleStopCycle = () => {
    dispatch(stopCycle())
    setIsLoading(true)
    setShowAlert(false)
  }

  useEffect(() => {
    const farmerLandId = searchParams.get("farmer_land_id")
    if (farmerLandId) {
      dispatch(getActiveCycle(farmerLandId))
      dispatch(
        getCompleteCycles({
          page: 1,
          limit: 10,
          farmer_land_id: farmerLandId,
        })
      )
    }
  }, [searchParams, cycleType])

  useEffect(() => {
    if (type == GET_ACTIVE_CYCLE_FULFILLED) {
      setIsLoading(false)
    } else if (type == GET_ALL_COMPLETE_CYCLE_FULFILLED) {
      setIsLoading(false)
    }
  }, [type, data, status, complete_cycles])

  useEffect(() => {
    if (type == GET_ALL_COMPLETE_CYCLE_FULFILLED) {
      const cycles = paginationData.items.concat(complete_cycles)

      if (cycles.length != 0 && cycles.length <= total_item) {
        if (
          cycles.length == total_item &&
          paginationData.isMaxPage == false &&
          paginationData.isHidden == false
        ) {
          setPaginationData((prevState) => {
            return {
              ...prevState,
              items: cycles,
              isMaxPage: true,
            }
          })
        }
        if (
          cycles.length == total_item &&
          paginationData.isMaxPage == false &&
          paginationData.isHidden == true
        ) {
          setPaginationData((prevState) => {
            return {
              ...prevState,
              items: cycles,
            }
          })
        }
        if (cycles.length < total_item && paginationData.isMaxPage == false) {
          setPaginationData((prevState) => {
            return {
              ...prevState,
              items: cycles,
            }
          })
        }
      }
    }
  }, [paginationData, total_item, data, searchParams])

  return (
    <div className="mx-8 flex flex-col gap-2">
      {isLoading ? (
        <Loading show={isLoading} />
      ) : (
        <>
          {data != null && (
            <>
              <div className="flex gap-4 mt-10">
                <Alert
                  show={showAlert}
                  status="confirmation"
                  title="Apakah anda yakin ingin menghentikan proses ini?"
                  content="Jika setuju, proses ini akan dihentikan."
                  labelPositive="Ya, hentikan"
                  labelNegative="Tidak"
                  onClickNegative={() => setShowAlert(false)}
                  onClickPositive={handleStopCycle}
                />
                <h2 className="text-3xl font-semibold mt-2">Daftar Riwayat</h2>
                {data && (
                  <Button
                    buttonType="primary"
                    label="Selesai Siklus"
                    disabled={false}
                    className="px-4 bg-tand-error shadow-none text-black hover:bg-tand-error active:bg-tand-error"
                    width="auto"
                    onClick={() => setShowAlert(true)}
                  />
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
                  <span className="font-semibold text-lg text-tand-appr-1 pr-6 border-r-[1px] border-[#EEEEEE] mr-4">
                    Rekap Kegiatan
                  </span>
                  <div className="w-full h-[1px] bg-[#EEEEEE] my-4" />
                  <div className="flex flex-wrap">
                    <span className="w-2/4 text-lg">Nama Kegiatan</span>
                    <span className="w-2/4 text-lg">Tanggal Kegiatan</span>
                    {data &&
                      data.activities.map((activity: any) => {
                        return (
                          <div
                            key={crypto.randomUUID()}
                            className="w-full flex"
                          >
                            <span className="w-2/4">
                              {activity.activity_name}
                            </span>
                            <span className="w-2/4">
                              {convertToIndonesiaTanggal(
                                activity.activity_date
                              )}
                            </span>
                          </div>
                        )
                      })}
                  </div>
                </div>

                <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
                  <span className="font-semibold text-lg text-tand-appr-1 pr-6 border-r-[1px] border-[#EEEEEE] mr-4">
                    Rekap Biaya Operasional
                  </span>
                  <div className="w-full h-[1px] bg-[#EEEEEE] my-4" />
                  <div className="flex flex-wrap">
                    <span className="w-2/4 text-lg">Nama Kegiatan</span>
                    <span className="w-2/4 text-lg">Biaya Operasional</span>
                    {data &&
                      data.operation_costs.datas.map((activity: any) => {
                        return (
                          <div
                            key={crypto.randomUUID()}
                            className="w-full flex"
                          >
                            <span className="w-2/4">
                              {activity.activity_name}
                            </span>
                            <span className="w-2/4">
                              {convertToIndonesiaTanggal(
                                activity.activity_date
                              )}
                            </span>
                          </div>
                        )
                      })}
                    <div className="w-2/4 ms-auto">
                      <div className="w-full h-[1px] bg-[#000] my-4" />
                      <p>Total Biaya Operasional</p>
                      {data && (
                        <span>
                          Rp.
                          {priceSplitter(
                            data.operation_costs.datas.total?.toString() ?? "0"
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
                  <span className="font-semibold text-lg text-tand-appr-1 pr-6 border-r-[1px] border-[#EEEEEE] mr-4">
                    Rekap Hasil Panen
                  </span>
                  <div className="w-full h-[1px] bg-[#EEEEEE] my-4" />
                  <div className="flex flex-wrap">
                    <span className="w-2/4 text-lg">Nama Panen</span>
                    <span className="w-2/4 text-lg">Jumlah Panen</span>
                    {data &&
                      data.harvests.datas.map((harvest: any) => {
                        return (
                          <div
                            key={crypto.randomUUID()}
                            className="w-full flex"
                          >
                            <span className="w-2/4">{harvest.name}</span>
                            <span className="w-2/4">{harvest.amount}</span>
                          </div>
                        )
                      })}
                    <div className="w-2/4 ms-auto">
                      <div className="w-full h-[1px] bg-[#000] my-4" />
                      <p>Total Panen</p>
                      {data && <span>{data.harvests.total}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
                  <span className="font-semibold text-lg text-tand-appr-1 pr-6 border-r-[1px] border-[#EEEEEE] mr-4">
                    Rekap Penjualan
                  </span>
                  <div className="w-full h-[1px] bg-[#EEEEEE] my-4" />
                  <div className="flex flex-wrap">
                    <span className="w-1/4 text-lg">Nama Penjualan</span>
                    <span className="w-1/4 text-lg">Tanggal Penjualan</span>
                    <span className="w-1/4 text-lg">Jumlah Penjualan</span>
                    <span className="w-1/4 text-lg">Harga</span>
                    {data &&
                      data.sellings.datas.map((activity: any) => {
                        return (
                          <div
                            key={crypto.randomUUID()}
                            className="w-full flex"
                          >
                            <span className="w-1/4">
                              {activity.activity_name}
                            </span>
                            <span className="w-1/4">
                              {convertToIndonesiaTanggal(
                                activity.activity_date
                              )}
                            </span>
                            <span className="w-1/4">
                              {convertToIndonesiaTanggal(
                                activity.activity_date
                              )}
                            </span>
                            <span className="w-1/4">
                              {convertToIndonesiaTanggal(
                                activity.activity_date
                              )}
                            </span>
                          </div>
                        )
                      })}
                    <div className="w-1/4 ms-auto">
                      <div className="w-full h-[1px] bg-[#000] my-4" />
                      <p>Total Penjualan</p>
                      {data && (
                        <span>
                          Rp.
                          {priceSplitter(
                            data.sellings.total?.toString() ?? "0"
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
                  <span className="font-semibold text-lg text-tand-appr-1 pr-6 border-r-[1px] border-[#EEEEEE] mr-4">
                    Rekap Pendapatan
                  </span>
                  <div className="w-full h-[1px] bg-[#EEEEEE] my-4" />
                  <div className="flex flex-wrap">
                    <span className="w-2/4 text-lg">Penjualan</span>
                    <span className="w-2/4 text-lg">
                      Rp.
                      {data &&
                        priceSplitter(
                          data.incomes.total_sellings?.toString() ?? "0"
                        )}
                    </span>
                    <span className="w-2/4 text-lg">Biaya Operasional</span>
                    <span className="w-2/4 text-lg">
                      Rp.
                      {data &&
                        priceSplitter(
                          data.incomes.total_operating_costs?.toString() ?? "0"
                        )}
                    </span>
                    <div className="w-full">
                      <div className="w-2/4 ms-auto h-[1px] bg-[#000] my-4" />
                    </div>
                    <span className="w-2/4 text-lg">Total Pendapatan</span>
                    <span className="w-2/4 text-lg">
                      Rp.
                      {data &&
                        priceSplitter(
                          data.incomes.total_incomes?.toString() ?? "0"
                        )}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-between mt-10">
            <h2 className="text-3xl font-semibold mt-2">
              Riwayat Budidaya/Siklus
            </h2>
          </div>
          <div className="gap-y-8 flex flex-col">
            {paginationData.isHidden
              ? paginationData.items.slice(0, 2).map((cycle, index) => {
                  return (
                    <CardHistory
                      key={crypto.randomUUID()}
                      link={`riwayat/${
                        cycle._id
                      }?farmer_land_id=${searchParams.get("farmer_land_id")}`}
                      name={`${cycle.cycle_name}, Komoditas ${cycle.commodity}`}
                      data={[
                        {
                          name: "Nama Penggarap",
                          value: `${cycle.farmer_name}`,
                        },
                        {
                          name: "Jumlah Panen",
                          value: `${cycle.total_harvest}`,
                        },
                        {
                          name: "Biaya Operasional",
                          value: `Rp.${priceSplitter(
                            cycle.total_operating_costs
                          )}`,
                        },
                        {
                          name: "Total Pendapatan",
                          value: `Rp.${priceSplitter(cycle.total_incomes)}`,
                        },
                      ]}
                    />
                  )
                })
              : paginationData.items.map((cycle, index) => {
                  return (
                    <CardHistory
                      key={crypto.randomUUID()}
                      link={`riwayat/${
                        cycle._id
                      }?farmer_land_id=${searchParams.get("farmer_land_id")}`}
                      name={`${cycle.cycle_name}, Komoditas ${cycle.commodity}`}
                      data={[
                        {
                          name: "Nama Penggarap",
                          value: `${cycle.farmer_name}`,
                        },
                        {
                          name: "Jumlah Panen",
                          value: `${cycle.total_harvest}`,
                        },
                        {
                          name: "Biaya Operasional",
                          value: `Rp.${priceSplitter(
                            cycle.total_operating_costs
                          )}`,
                        },
                        {
                          name: "Total Pendapatan",
                          value: `Rp.${priceSplitter(cycle.total_incomes)}`,
                        },
                      ]}
                    />
                  )
                })}
          </div>

          {paginationData.isMaxPage == false && complete_cycles.length != 0 ? (
            <CardPagination
              onClick={() => {
                if (paginationData.isHidden == true) {
                  setPaginationData((prevState) => {
                    return {
                      ...prevState,
                      isHidden: false,
                    }
                  })
                } else {
                  setIsLoading(true)
                  const farmerLandId = searchParams.get("farmer_land_id") ?? ""
                  dispatch(
                    getCompleteCycles({
                      page: paginationData.page + 1,
                      limit: 10,
                      farmer_land_id: farmerLandId,
                    })
                  )
                  setPaginationData((prevState) => {
                    return {
                      ...prevState,
                      page: prevState.page + 1,
                    }
                  })
                }
              }}
            />
          ) : null}
        </>
      )}
    </div>
  )
}

const ListActivity: React.FC = () => {
  const { activities } = useAppSelector((state) => state.history)
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

  useEffect(() => {
    const farmerLandId = searchParams.get("farmer_land_id")
    if (farmerLandId && rangeDate) {
      dispatch(
        getHistoryActivities({
          farmer_land_id: farmerLandId,
          start_date: rangeDate.startDate,
          end_date: rangeDate.endDate,
        })
      )
    }
  }, [rangeDate])

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
      <div className="flex flex-wrap">
        <span className="w-2/4 text-lg">Nama Kegiatan</span>
        <span className="w-2/4 text-lg">Tanggal Kegiatan</span>
        {activities.map((activity) => {
          return (
            <div key={crypto.randomUUID()} className="w-full flex">
              <span className="w-2/4">{activity.activity_name}</span>
              <span className="w-2/4">
                {convertToIndonesiaTanggal(activity.activity_date)}
              </span>
            </div>
          )
        })}
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
  const { incomes } = useAppSelector((state) => state.history)
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
        getHistoryIncomes({
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
          {incomes ? (
            <>
              <span>
                Biaya Operasional : Rp.{" "}
                {priceSplitter(
                  incomes.total_operating_costs?.toString() ?? "0"
                )}
              </span>
              <span>
                Penjualan : Rp.{" "}
                {priceSplitter(incomes.total_sellings?.toString() ?? "0")}
              </span>
            </>
          ) : null}
        </div>
        <div className="w-full h-[1px] bg-[#000] my-4" />
        {incomes != null ? (
          <span>
            Total Pendapatan : Rp.{" "}
            {priceSplitter(incomes.total_incomes?.toString() ?? "0")}
          </span>
        ) : null}
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
                {harvest.name} : {harvest.amount} Ton
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
