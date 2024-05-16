export type FormPenjualanData = {
    farmer_land_id: string
    proof_payment: string | null
    distributor: string
    price: string | number
    selling_date: string
    unit: { id: string; name: string } | null
    amount: number
  }
  
  export type UpdateFormPenjualanData = FormPenjualanData & {
    sell_id: string
  }
  
  export interface FormPenjualan {
    type?: "create" | "update"
    initialValues: FormPenjualanData | UpdateFormPenjualanData
    onSubmit: (payload: FormPenjualanData | UpdateFormPenjualanData, action: string) => void
    onCloseModal: (value: boolean) => void
  }
  