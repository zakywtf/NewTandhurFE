export type FormActivityData = {
  farmer_land_id: string
  type_activity: { _id: string; name: string } | null
  activity_date: string
  operating_costs: number
  treatment: string | null
  amount: string | number | null
  unit: { id: string; name: string } | null
  brand: string | null
}

export type UpdateFormActivityData = FormActivityData & {
  activity_id: string
}

export type TypesData = {
  _id: string
  name: string
}

export interface FormActivity {
  type?: "create" | "update"
  types: TypesData[]
  initialValues: FormActivityData | UpdateFormActivityData
  onSubmit: (payload: FormActivityData | UpdateFormActivityData, action: string) => void
  onCloseModal: (value: boolean) => void
}
