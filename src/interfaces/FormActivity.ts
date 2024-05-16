export type FormActivityData = {
  farmer_land_id: string
  type_activity: { id: string; name: string } | null
  activity_date: string
  operating_costs: number
  treatment: string
  amount: string | number
  unit: { id: string; name: string } | null
  brand: string
}

export type TypesData = {
  _id: string
  name: string
}

export interface FormActivity {
  type?: "create" | "update"
  types: TypesData[]
  initialValues: FormActivityData
  onSubmit: (payload: FormActivityData, action: string) => void
  onCloseModal: (value: boolean) => void
}
