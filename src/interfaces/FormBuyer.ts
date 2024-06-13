export type FormBuyerData = {
  agency: string
  name: string
  phone: string
  province: {
    id: string
    name: string
  } | null
  regencies: {
    id: string
    name: string
  } | null
  district: {
    id: string
    name: string
  } | null
  village: {
    id: string
    name: string
  } | null
}

export interface FormBuyer {
  type?: "create"
  initialValues: FormBuyerData
  onSubmit: (payload: FormBuyerData, action: string) => void
  onCloseModal: (value: boolean) => void
}
