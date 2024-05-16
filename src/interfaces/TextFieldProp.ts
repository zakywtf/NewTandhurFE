interface TextFieldProp {
  onChange: any
  onBlur: any
  value: string
  name: string
  disabled: boolean
  label?: string
  styleLabel?: string
  type?: string
  subLabel?: string
  styleSubLabel?: string
  placeholder?: string
  error: boolean | undefined | string
  errorText?: string
  suffixText?: string
  preffixText?: string
}
