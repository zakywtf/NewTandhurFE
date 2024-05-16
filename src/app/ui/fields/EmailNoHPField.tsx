"use client"
import { useState, useEffect } from "react"

export default function EmailNomorHPField({
  onChange,
  onBlur,
  value,
  name,
  disabled = false,
  label = "Kata Sandi",
  error = false,
  errorText = "",
}: {
  onChange: any
  onBlur: any
  value: string
  name: string
  disabled: boolean
  label: string
  error: boolean | undefined | string
  errorText?: string
}) {
  const [isNumber, setIsNumber] = useState(false)

  useEffect(() => {
    var text = value
    if (text.length > 0) {
      var reg = /^\d+$/
      if (reg.test(text)) {
        setIsNumber(true)
      } else {
        setIsNumber(false)
      }
    } else {
      setIsNumber(false)
    }
  }, [value])

  return (
    <div className="flex flex-col">
      <label
        className={`text-sm font-medium ${
          error ? "text-tand-error" : "text-tand-appr-1"
        }`}
      >
        {label}
      </label>
      <div className="flex mt-1.5">
        {isNumber && (
          <>
            <span
              className={
                "inline-flex items-center py-3.5 pl-4 pr-2 rounded-l-md  text-tand-appr-3 text-sm border-l-[1px] border-t-[1px] border-b-[1px] " +
                (error ? "border-tand-error" : "border-[#E1E1E1]")
              }
            >
              {" "}
              +62{" "}
            </span>
            <div
              className={`w-[1px] py-3.5 border-t-[1px] border-b-[1px] ${
                error ? "border-tand-error" : "border-[#E1E1E1]"
              }`}
            >
              <div className={"bg-[#E1E1E1]  h-full"} />
            </div>
          </>
        )}
        <input
          name={name}
          id={name}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          type="text"
          className={`text-tand-appr-1 text-sm font-normal py-3.5 flex-1 focus:outline-none 
              ${
                isNumber
                  ? "rounded-r-[5px] border-r-[1px] border-t-[1px] border-b-[1px] pr-4 pl-2"
                  : "rounded-[5px] px-4 border"
              } 
              ${error ? " border-tand-error" : " border-[#E1E1E1]"}`}
          placeholder="Ketik email atau nomor hp di sini"
        />
      </div>
      {error && (
        <span className="text-xs text-tand-error mt-1.5">{errorText}</span>
      )}
    </div>
  )
}
