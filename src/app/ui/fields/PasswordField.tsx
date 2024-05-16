"use client"
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react"

export default function PasswordField({
  onChange,
  onBlur,
  value,
  name,
  disabled = false,
  label = "Kata Sandi",
  error = false,
  errorText = "",
  caption = "Kata sandi minimal 8 karakter berupa kombinasi angka, huruf besar dan huruf kecil.",
  showLevel = false,
  placeholder,
}: {
  onChange: any
  onBlur: any
  value: string
  name: string
  disabled: boolean
  label?: string
  error: boolean | undefined | string
  errorText?: string
  caption?: string
  showLevel?: boolean
  placeholder?: string
}) {
  const [showPassword, setShowPassword] = useState(false)

  const [passwordLevel, setPasswordLevel] = useState("")

  useEffect(() => {
    if (/^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])/.test(value) && value.length >= 8) {
      setPasswordLevel("Sangat Kuat")
    } else if (
      (/^(?=.*[a-z])(?=.*[A-Z])/.test(value) ||
        /^(?=.*[A-Z])(?=.*[0-9])/.test(value) ||
        /^(?=.*[0-9])(?=.*[a-z])/.test(value)) &&
      value.length >= 8
    ) {
      setPasswordLevel("Cukup Kuat")
    } else if (
      (/^(?=.*[a-z])/.test(value) ||
        /^(?=.*[A-Z])/.test(value) ||
        /^(?=.*[0-9])/.test(value)) &&
      value.length >= 8
    ) {
      setPasswordLevel("Kurang Kuat")
    } else {
      setPasswordLevel("")
    }
  }, [value])

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        {label && (
          <label
            className={`text-sm font-medium  ${
              error ? "text-tand-error" : "text-tand-appr-1"
            }`}
          >
            {label}
          </label>
        )}
        {showLevel && (
          <span
            className={` ${
              passwordLevel == "Sangat Kuat" ? "text-tand-success " : ""
            } ${passwordLevel == "Cukup Kuat" ? "text-tand-warning " : ""} ${
              passwordLevel == "Kurang Kuat" ? "text-tand-error " : ""
            }  text-sm font-medium`}
          >
            {passwordLevel}
          </span>
        )}
      </div>
      <div className="mt-1.5 relative">
        <input
          name={name}
          id={name}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          type={showPassword ? "text" : "password"}
          className={`focus:outline-none w-full text-tand-appr text-sm font-normal py-3.5 pl-4 pr-12 border rounded-[5px] ${
            error ? "border-tand-error" : "border-[#E1E1E1]"
          }`}
          placeholder={placeholder}
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer">
          {!showPassword ? (
            <EyeIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <EyeOffIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
      </div>
      {error && (
        <span className="text-xs text-tand-error mt-1.5">{errorText}</span>
      )}
      {!error && caption && (
        <span className="text-xs text-tand-appr-1 mt-1.5">{caption}</span>
      )}
    </div>
  )
}
