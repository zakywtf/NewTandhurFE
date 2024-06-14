export type ButtonProp = {
  label?: string
  disabled?: boolean
  buttonType: "primary" | "secondary"
  loading?: boolean
  type?: "submit" | "reset" | "button" | undefined
  onClick?: () => void
  shadow?: boolean
  width?: string
  className?: string
  icon?: React.ReactNode
  data?: any
}
