export interface Payload {
  status: {
    success: boolean
    message: string | null
  }
  data?: any[] | null | any
}
