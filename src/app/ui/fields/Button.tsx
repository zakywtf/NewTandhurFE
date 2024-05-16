import { ButtonProp } from "@/interfaces/ButtonProp"
import React from "react"

const Button: React.FC<ButtonProp> = ({
  label = "Button",
  buttonType = "primary",
  disabled = false,
  loading = false,
  type = "button",
  onClick = () => null,
  shadow = true,
  width = "full",
  className = "",
  icon,
}) => {
  if (buttonType == "primary") {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`font-semibold text-sm text-white w-${width} py-3 rounded-[5px] flex flex-row items-center justify-center ${
          shadow ? "shadow-button" : ""
        } ${
          disabled
            ? "bg-tand-appr-5 shadow-none"
            : "bg-tand-1 hover:bg-tand-4 active:bg-tand-5"
        } ${className}`}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}

        {icon && icon}
        <span>{label}</span>
      </button>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-semibold text-sm text-tand-2 w-${width} py-3 rounded-[5px] flex flex-row justify-center ${
        disabled ? "bg-tand-appr-5" : "hover:bg-tand-6 active:bg-tand-7"
      } ${
        shadow ? "hover:shadow-button active:shadow-button" : ""
      } ${className}`}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-tand-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {icon && icon}
      <span>{label}</span>
    </button>
  )
}

export default Button
