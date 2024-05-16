import {
  CREATE_SELL,
  GET_ALL_SELL,
  GET_SELL_BY_ID,
  UPDATE_SELL,
} from "@/helpers/const"
import {
  FormPenjualanData,
  UpdateFormPenjualanData,
} from "@/interfaces/FormPenjualan"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getSells = createAsyncThunk(
  GET_ALL_SELL,
  async (farmerLandId: string) => {
    const getAll = async (farmerLandId: string) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/sells?farmer_land_id=${farmerLandId}`
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (res.status == 200) {
        const data = await res.json()

        return {
          status: {
            success: true,
            message: data.message,
          },
          data: data.data.length == 0 ? [] : data.data.datas,
        }
      }

      return {
        status: {
          success: false,
          message: "failed",
        },
        data: [],
      }
    }

    const response = await getAll(farmerLandId)

    return response
  }
)

export const createSell = createAsyncThunk(
  CREATE_SELL,
  async (data: FormPenjualanData) => {
    const create = async (data: FormPenjualanData) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/sells?farmer_land_id=${data.farmer_land_id}`
      const formData = new FormData()
      if (data.proof_payment) {
        formData.append("proof_payment", data.proof_payment)
        formData.append("price", data.price.toString())
        formData.append("selling_date", data.selling_date)
        formData.append("distributor", data.distributor)
        formData.append("unit", data.unit?.id ?? "")
        formData.append("amount", data.amount.toString())

        const res = await fetch(url, {
          method: "POST",
          body: formData,
        })

        if (res.status == 200) {
          const data = await res.json()

          return {
            status: {
              success: true,
              message: data.message,
            },
          }
        }
        return {
          status: {
            success: false,
            message: "failed",
          },
        }
      }

      return {
        status: {
          success: false,
          message: "file not found",
        },
      }
    }

    const response = await create(data)

    return response
  }
)

export const getSellById = createAsyncThunk(
  GET_SELL_BY_ID,
  async (sellId: string) => {
    const getById = async (sellId: string) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/sells/${sellId}`
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (res.status == 200) {
        const data = await res.json()

        return {
          status: {
            success: true,
            message: data.message,
          },
          data: data.data ? data.data : null,
        }
      }

      return {
        status: {
          success: false,
          message: "failed",
        },
        data: null,
      }
    }

    const response = await getById(sellId)

    return response
  }
)

export const updateSell = createAsyncThunk(
  UPDATE_SELL,
  async (data: UpdateFormPenjualanData) => {
    const create = async (data: UpdateFormPenjualanData) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/sells/${data.sell_id}`

      const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          proof_payment: data.proof_payment,
          price: data.price,
          selling_date: data.selling_date,
          distributor: data.distributor,
          unit: data.unit?.id ?? "null",
          amount: data.amount,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (res.status == 200) {
        const data = await res.json()

        return {
          status: {
            success: true,
            message: data.message,
          },
        }
      }

      return {
        status: {
          success: false,
          message: "failed",
        },
      }
    }

    const response = await create(data)

    return response
  }
)
