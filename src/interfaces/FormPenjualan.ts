export type FormPenjualanData = {
    farmer_land_id: string
    proof_payment: string | null
    name: string
    price: string | number
    selling_date: string
    unit: { id: string; name: string } | null
    amount: number
    commodity_id: {
      _id: string
      name: string
    },
    buyer_id: {
      _id: string
      name: string
    },
    cycle_id: {
      _id: string
      name: string
    },
    
  }
  
  export type UpdateFormPenjualanData = FormPenjualanData & {
    sell_id: string
  }
  
  export interface FormPenjualan {
    type?: "create" | "update"
    initialValues: FormPenjualanData | UpdateFormPenjualanData
    onSubmit: (payload: FormPenjualanData | UpdateFormPenjualanData, action: string) => void
    onCloseModal: (value: boolean) => void
    onOpenBuyerModal?: () => void
  }
  