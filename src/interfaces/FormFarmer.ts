export type FormFarmerData = {
  nik: string
  name: string
  address: string
  phone: string
  gender: {
    id: string
    name: string
  }
  date_of_birth: string
  age: number
}

export interface FormFarmer {
  type?: "create"
  initialValues: FormFarmerData
  onSubmit: (payload: FormFarmerData, action: string) => void
  onCloseModal: (value: boolean) => void
}
