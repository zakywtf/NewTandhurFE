export type FormSiklusData = {
  farmer_land_id?: string | null
  farmer_id: {
    _id: string,
    name: string
  }
  name: string
  commodity_id: {
    _id: string
    name: string
  }
  cultivation_guide: {
    _id: string
    name: string
  }
  start_date: string
}

export interface FormSiklus {
  type?: "create" | "update"
  initialValues: FormSiklusData
  onSubmit: (payload: FormSiklusData, action: string) => void
  onCloseModal: (value: boolean) => void
  onOpenFarmerModal: () => void
}
