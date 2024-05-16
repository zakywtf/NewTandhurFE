import { FormikProps } from "formik"

type AutoCompleteData = {
  id: string
  name: string
}

export interface AutoCompleteProp {
  name: string
  disabled: boolean
  placeholder?: string
  label: string
  onSelect: (value: any) => void
  onChange: (value: any) => void
  styleLabel: string
  subLabel?: string
  styleSubLabel?: string
  error: boolean
  errorText?: string
  listItem: AutoCompleteData[]
  formik: FormikProps<any>
}
