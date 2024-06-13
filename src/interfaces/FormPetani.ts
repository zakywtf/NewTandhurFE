export type FormPetaniData = {
  nik: string
  name: string
  email: string
  phone: string
  owner_name: string
  large: string | number
  longitude: number
  latitude: number
  province?: null | {
    id: string
    name: string
  }
  regencies?: null | {
    id: string
    name: string
  }
  district?: null | {
    id: string
    name: string
  }
  village?: null | {
    id: string
    name: string
  }
}

export interface FormPetani {
  type?: "create" | "update"
  initialValues: FormPetaniData
  onSubmit: (payload: FormPetaniData, action: any) => any
  onCloseModal: (value: boolean) => void
}
