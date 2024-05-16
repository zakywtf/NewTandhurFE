export type FormPanenData = {
  farmer_land_id: string
  name: string
  operating_costs: string | number
  harvest_date: string
  unit: { id: string; name: string } | null
  amount: number
}

export type UpdateFormPanenData = FormPanenData & {
  harvest_id: string
}

export interface FormPanen {
  type?: "create" | "update"
  initialValues: FormPanenData | UpdateFormPanenData
  onSubmit: (payload: FormPanenData | UpdateFormPanenData, action: string) => void
  onCloseModal: (value: boolean) => void
}
