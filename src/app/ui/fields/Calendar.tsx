"use client"

import { CalendarProp } from "@/interfaces/CalendarProp"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"
import moment from "moment"
import "moment/locale/id"
import React, { useEffect, useState } from "react"

const Calendar: React.FC<CalendarProp> = ({
  valueSelected,
  onChange,
  showPast = true,
  pastFrom = moment().format("YYYY-MM-DD"),
  showFuture = true,
  futureFrom = moment().format("YYYY-MM-DD"),
}) => {
  const [calenderList, setCalenderList] = useState<any>([])
  const [selectedDate, setSelectedDate] = useState<any>(null)
  const [currentMonth, setCurrentMonth] = useState<any>(1)
  const [currentYear, setCurrentYear] = useState<any>(2022)

  const [yearList, setYearList] = useState([])
  const [indexYearList, setIndexYearList] = useState(2012)

  const [currentSection, setCurrentSection] = useState("date")

  useEffect(() => {
    var select: any = valueSelected
      ? moment(select).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD")
    if (!showPast && select < pastFrom) {
      select = pastFrom
    } else if (!showFuture && select > futureFrom) {
      select = futureFrom
    } else {
      select = valueSelected
    }

    const currentM = select ? moment(select).format("M") : moment().format("M")
    const currentY = select
      ? moment(select).format("YYYY")
      : moment().format("YYYY")
    const currentD = select
      ? moment(select).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD")

    setCurrentMonth(currentM)
    setCurrentYear(currentY)
    setSelectedDate(currentD)
    generateKalender(currentM, currentY)
    setSelectedDate(currentD)
  }, [])

  function nextMonth() {
    if (parseInt(currentMonth) === 12) {
      const nextYear = parseInt(currentYear) + 1
      setCurrentYear(nextYear)
      setCurrentMonth(1)
      generateKalender(1, nextYear)
    } else {
      const nextMonth = parseInt(currentMonth) + 1
      setCurrentMonth(nextMonth)
      generateKalender(nextMonth, currentYear)
    }
  }

  function prevMonth() {
    if (parseInt(currentMonth) === 1) {
      const prevYear = parseInt(currentYear) - 1
      setCurrentYear(prevYear)
      setCurrentMonth(12)
      generateKalender(12, prevYear)
    } else {
      const prevMonth = parseInt(currentMonth) - 1
      setCurrentMonth(prevMonth)
      generateKalender(prevMonth, currentYear)
    }
  }

  function nextYearIndex() {
    setIndexYearList(indexYearList + 12)
  }

  function prevYearIndex() {
    setIndexYearList(indexYearList - 12)
  }

  function selectMonth(month: any) {
    setCurrentMonth(month)
    generateKalender(month, currentYear)
    setCurrentSection("date")
  }
  function selectYear(year: any) {
    setCurrentYear(year)
    generateKalender(currentMonth, year)
    setCurrentSection("date")
  }

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ")
  }

  function weekOfMonth(date: any) {
    let weekInYearIndex = date.week()
    if (date.year() !== date.weekYear()) {
      weekInYearIndex = date.clone().subtract(1, "week").week() + 1
    }
    const weekIndex = weekInYearIndex - moment(date).startOf("month").week() + 1

    return weekIndex
  }

  function generateKalender(showMonth: any = 1, showYear: any = 2022) {
    const allKalender = []
    const tahun = moment().year(showYear).format("YYYY")

    for (var bul = 1; bul <= 12; bul++) {
      const momentSekarang = moment(
        String(tahun) + "-" + String(bul).padStart(2, "0") + "-15"
      ).locale("id")
      momentSekarang.locale("id")
      const dayInMonth = momentSekarang.daysInMonth()

      var tempTanggal = []

      for (var i = 1; i <= dayInMonth; i++) {
        const tanggal = String(i).padStart(2, "0")
        tempTanggal.push(
          momentSekarang.format("YYYY") +
            "-" +
            momentSekarang.format("MM") +
            "-" +
            tanggal
        )
      }

      const tempp: any[] = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]

      for (var i = 0; i < tempTanggal.length; i++) {
        var item = tempTanggal[i]
        if (item !== "") {
          tempp[(weekOfMonth(moment(item)) - 1) * 7 + moment(item).day()] = {
            date: item,
            iSelected: item === moment(valueSelected).format("YYYY-MM-DD"),
            isCurrentMonth: true,
          }
        }
      }

      allKalender.push({
        index_bulan: bul,
        item: tempp,
        bulan_text: momentSekarang.format("MMMM"),
        tahun: momentSekarang.format("YYYY"),
      })
    }

    setCalenderList(
      allKalender.filter((item: any) => showMonth == item.index_bulan)
    )
  }

  useEffect(() => {
    if (currentSection != "date") {
      onChange(null)
    }
  }, [currentSection])

  return (
    <div>
      {currentSection == "date" && (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl">
            <div className="relative grid grid-cols-1 gap-x-14">
              <button
                type="button"
                onClick={() => prevMonth()}
                className="absolute -top-1 -left-1.5 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => nextMonth()}
                className="absolute -top-1 -right-1.5 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {calenderList.map((month: any, monthIndex: number) => (
                <section
                  key={monthIndex}
                  className={classNames(
                    monthIndex === calenderList.length - 1 && "hidden md:block",
                    "text-center"
                  )}
                >
                  <h2 className="font-semibold text-gray-900">
                    <span
                      className="cursor-pointer"
                      onClick={() => setCurrentSection("month")}
                    >
                      {month.bulan_text}
                    </span>{" "}
                    <span
                      className="cursor-pointer"
                      onClick={() => setCurrentSection("year")}
                    >
                      {month.tahun}
                    </span>
                  </h2>
                  <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                    <div>M</div>
                    <div>S</div>
                    <div>S</div>
                    <div>R</div>
                    <div>K</div>
                    <div>J</div>
                    <div>S</div>
                  </div>
                  <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                    {month.item.map((day: any, dayIndex: any) => (
                      <button
                        key={dayIndex}
                        type="button"
                        onClick={() => {
                          if (!showPast && day.date < pastFrom) {
                            setSelectedDate(null)
                            onChange(null)
                          } else if (!showFuture && day.date > futureFrom) {
                            setSelectedDate(null)
                            onChange(null)
                          } else {
                            setSelectedDate(day.date)
                            onChange(day.date)
                          }
                        }}
                        className={classNames(
                          day.isCurrentMonth
                            ? "bg-white text-tand-appr-1"
                            : "bg-gray-50 text-gray-400",
                          dayIndex === 0 && "rounded-tl-lg",
                          dayIndex === 6 && "rounded-tr-lg",
                          dayIndex === month.item.length - 7 && "rounded-bl-lg",
                          dayIndex === month.item.length - 1 && "rounded-br-lg",
                          "relative py-1.5 hover:bg-gray-100 focus:z-10"
                        )}
                      >
                        <time
                          dateTime={dayIndex}
                          className={classNames(
                            day.date ===
                              moment(selectedDate).format("YYYY-MM-DD") &&
                              "bg-tand-1 font-semibold text-white",
                            "mx-auto flex h-7 w-7 items-center justify-center rounded-full"
                          )}
                        >
                          {day.date ? moment(day.date).format("DD") : ""}
                        </time>
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentSection == "month" && (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl">
            <div className="flex flex-row justify-center mb-3 items-center">
              <h2 className="font-semibold text-gray-900">{currentYear}</h2>
            </div>
            <div className="relative grid grid-cols-4">
              {[...Array(12)].map((x, i) => {
                const bulan = moment().month(i).format("MMM")
                return (
                  <span
                    key={crypto.randomUUID()}
                    onClick={() => selectMonth(i + 1)}
                    className={`rounded-lg text-center hover:bg-gray-100 ${
                      currentMonth == i + 1
                        ? "bg-tand-1 font-semibold text-white"
                        : "text-base text-medium text-tand-appr-1"
                    }  cursor-pointer p-2`}
                  >
                    {bulan}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {currentSection == "year" && (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl">
            <div className="flex flex-row justify-between mb-3 items-center">
              <button
                type="button"
                onClick={() => prevYearIndex()}
                className="flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <h2 className="font-semibold text-gray-900">
                {indexYearList} - {indexYearList + 11}
              </h2>
              <button
                type="button"
                onClick={() => nextYearIndex()}
                className="flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="relative grid grid-cols-4">
              {[...Array(12)].map((x, i) => {
                return (
                  <span
                    key={crypto.randomUUID()}
                    onClick={() => selectYear(indexYearList + i)}
                    className={`rounded-lg text-center hover:bg-gray-100 ${
                      currentYear == indexYearList + i
                        ? "bg-tand-1 font-semibold text-white"
                        : "text-base text-medium text-tand-appr-1"
                    }  cursor-pointer p-2`}
                  >
                    {indexYearList + i}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar
