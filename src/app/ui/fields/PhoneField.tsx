import { useEffect, useState } from "react"

export default function PhoneField({
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
}: {
  onChange: any
  onBlur: any
  value: string
  name: string
  disabled?: boolean
  label?: string
  styleLabel?: string
  type?: string
  subLabel?: string
  styleSubLabel?: string
  placeholder?: string
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
      {label && (
        <label className={styleLabel + (error ? " text-tand-error" : "")}>
          {label}{" "}
          {subLabel && (
            <span className={styleSubLabel + (error ? " text-tand-error" : "")}>
              {subLabel}
            </span>
          )}
        </label>
      )}
      <div className="flex mt-1.5 w-full">
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
          className={
            "w-[1px] py-3.5 border-t-[1px] border-b-[1px] " +
            (error ? "border-tand-error" : "border-[#E1E1E1]")
          }
        >
          <div className={"bg-[#E1E1E1]  h-full"} />
        </div>
        <input
          name={name}
          id={name}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          type="text"
          className={
            "text-tand-appr-1 text-sm font-normal py-3.5 flex-1 focus:outline-none rounded-r-[5px] border-r-[1px] border-t-[1px] border-b-[1px] pr-4 pl-2 w-full " +
            (error ? " border-tand-error" : " border-[#E1E1E1]")
          }
          placeholder={placeholder}
        />
      </div>
      {error && (
        <span className="text-xs text-tand-error mt-1.5">{errorText}</span>
      )}
    </div>
  )
}
