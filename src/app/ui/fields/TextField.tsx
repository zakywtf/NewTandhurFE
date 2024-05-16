"use client"

import { priceSplitter } from "@/helpers/helper"
import React from "react"

const TextField: React.FC<TextFieldProp> = ({
  onChange,
  onBlur,
  value,
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
}) => {
  const handleChangeToNumber = (event: any) => {
    const text = event.target.value
    if (type == "number") {
      return text.replace(/\D/g, "")
    } else if (type == "money") {
      return text
        .replace(/[^0-9]/g, "")
        .replace(/^0+/, "")
        .replace(".", "")
    } else if (type == "letter") {
      return text.replace(/[^a-zA-Z\s]/g, "")
    } else {
      return text
    }
  }

  return (
    <div className="flex flex-col">
      {label && (
        <label className={` ${styleLabel} ${error ? " text-tand-error" : ""}`}>
          {label}{" "}
          {subLabel && (
            <span
              className={`${styleSubLabel} ${error ? " text-tand-error" : ""}`}
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
          name={name}
          id={name}
          disabled={disabled}
          onChange={(e) => {
            onChange({ target: { value: handleChangeToNumber(e), name } })
          }}
          onBlur={onBlur}
          value={type == "money" ? priceSplitter(value) : value}
          type={type == "number" ? "text" : type}
          className={`overflow-hidden focus:outline-none text-tand-appr-1 text-sm font-normal grow `}
          placeholder={placeholder}
        />
        {suffixText && (
          <div className="text-sm font-normal items-center ">{suffixText}</div>
        )}
      </div>
      {error && (
        <span className="text-xs text-tand-error mt-1.5">{errorText}</span>
      )}
    </div>
  )
}

export default TextField
