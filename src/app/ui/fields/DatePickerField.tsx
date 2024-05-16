"use client"

import moment from "moment"
import "moment/locale/id"
import { useState } from "react"
import Calendar from "./Calendar"
import Button from "./Button"

export default function DatePickerField(props: any) {
  const {
    onChange,
    onBlur,
    value = moment().format("YYYY-MM-DD"),
    name,
    disabled = false,
    label,
    styleLabel = "text-sm font-medium text-tand-appr-1",
    type = "text",
    subLabel,
    styleSubLabel = "text-sm font-medium text-tand-appr-1",
    placeholder,
    error = false,
    errorText,
    suffixText,
    preffixText,
    showPast = true,
    pastFrom = moment().format("YYYY-MM-DD"),
    showFuture = true,
    futureFrom = moment().format("YYYY-MM-DD"),
  } = props

  const handleChangeToNumber = (event: any) => {
    const text = event.target.value
    if (type == "number") {
      return text.replace(/\D/g, "")
    } else {
      return text
    }
  }

  const [currentVal, setCurrentVal] = useState(value)
  const [selectedDate, setSelectedDate] = useState(value)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {showModal && (
        <div className="w-screen fixed top-0 left-0 bottom-0 right-0 h-screen bg-black/[0.4] z-10 flex items-center justify-center">
          <div className="bg-white flex flex-col shadow-main-4 rounded-[12px] p-8 w-[400px]">
            <span className="text-base font-semibold text-tand-appr-1 mb-4">
              Pilih Tanggal
            </span>
            <Calendar
              showPast={showPast}
              showFuture={showFuture}
              pastFrom={pastFrom}
              futureFrom={futureFrom}
              valueSelected={currentVal}
              onChange={(dat) => {
                setCurrentVal(dat)
              }}
            />
            <div className="flex flex-row gap-x-6 pt-4">
              <Button
                buttonType="secondary"
                label="Batal"
                onClick={() => {
                  setShowModal(false)
                }}
              />
              <Button
                buttonType="primary"
                disabled={!currentVal}
                label="Pilih"
                onClick={() => {
                  onChange({ target: { value: currentVal, name } })
                  setSelectedDate(currentVal)
                  setShowModal(false)
                }}
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col">
        {label && (
          <label
            className={` ${styleLabel} ${error ? " text-tand-error" : ""}`}
          >
            {label}{" "}
            {subLabel && (
              <span
                className={`${styleSubLabel} ${
                  error ? " text-tand-error" : ""
                }`}
              >
                {subLabel}
              </span>
            )}
          </label>
        )}

        <div
          className={` mt-1.5 flex flex-row py-3.5 px-4 gap-x-2 w-full border rounded-[5px] ${
            error ? "border-tand-error" : "border-[#E1E1E1]"
          }`}
        >
          {preffixText && (
            <>
              <div className="text-sm font-normal flex items-center text-tand-appr-2 pr-3 mr-2 border-r-[1px] border-[#E1E1E1]">
                {preffixText}
              </div>
            </>
          )}

          <input
            readOnly={true}
            onClick={() => {
              if (!disabled) {
                setShowModal(true)
              }
            }}
            value={
              selectedDate
                ? moment(selectedDate).locale("id").format("dddd, D MMMM YYYY")
                : ""
            }
            className={`overflow-hidden focus:outline-none text-tand-appr-1 text-sm font-normal grow `}
            placeholder={placeholder}
          />

          <input
            name={name}
            id={name}
            disabled={disabled}
            readOnly={true}
            onChange={(event) => {
              onChange({ target: { value: event.target.value, name } })
            }}
            onBlur={onBlur}
            value={value}
            type="hidden"
            className={`overflow-hidden focus:outline-none text-tand-appr-1 text-sm font-normal grow `}
            placeholder={placeholder}
          />

          {suffixText && (
            <div className="text-sm font-normal items-center ">
              {suffixText}
            </div>
          )}

          <div
            className="w-4 h-4 cursor-pointer text-tand-appr-2"
            onClick={() => setShowModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {error && errorText && (
          <span className="text-xs text-tand-error mt-1.5">{errorText}</span>
        )}
      </div>
    </>
  )
}
