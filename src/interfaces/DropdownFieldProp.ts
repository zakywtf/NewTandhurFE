import { FormikProps } from "formik"

export interface DropdownFieldsProps {
  name: string
  className?: string
  disabled?: boolean
  label?: string
  styleLabel?: string
  type?: string
  subLabel?: string
  styleSubLabel?: string
  error?: boolean | string | undefined
  errorText?: string
  listItem: any[]
  formik?: FormikProps<any>
  placeholder?: string | undefined
  onChange: (value: any) => void
}
