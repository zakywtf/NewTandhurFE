import { createAsyncThunk } from "@reduxjs/toolkit"
import moment from "moment"
import "moment/locale/id"
import { FormPetaniData } from "../interfaces/FormPetani"
import {
  CREATE_FARMER_LAND,
  CREATE_HARVEST,
  GET_ALL_FARMER,
  GET_ALL_HARVEST,
  GET_MASTER_DESA,
  GET_MASTER_KABUPATEN,
  GET_MASTER_KECAMATAN,
  GET_MASTER_PROVINSI,
} from "./const"
import { FormPanenData } from "@/interfaces/FormPanen"

const ifemptyData = (data: any, indexArray: any[], value?: any): any => {
  try {
    var dataIndex = indexArray.reduce(
      (value: { [x: string]: any }, entry: string | number) => value[entry],
      data
    )
    return dataIndex == null ? value : dataIndex
  } catch (e) {
    return value
  }
}

const priceSplitter = (number: string) =>
  number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

function convertToIndonesiaTanggal(tanggal: string) {
  const result = moment(tanggal).locale("id").format("dddd, D MMMM YYYY")

  if (moment(tanggal).isValid()) {
    return result
  } else {
    return tanggal
  }
}

const getMasterProvinsi = createAsyncThunk(GET_MASTER_PROVINSI, async () => {
  const fetchProvinsi = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/masters/provinsi`
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
        data: data.data,
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
  const response = await fetchProvinsi()

  return response
})

const getMasterKabupaten = createAsyncThunk(
  GET_MASTER_KABUPATEN,
  async (provinsiId: string) => {
    const fetchKabupaten = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/masters/kabupaten?id_provinsi=${provinsiId}`
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
          data: data.data,
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
    const response = await fetchKabupaten()

    return response
  }
)

const getMasterKecamatan = createAsyncThunk(
  GET_MASTER_KECAMATAN,
  async (kabupatenId: string) => {
    const fetchKecamatan = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/masters/kecamatan?id_kabupaten=${kabupatenId}`
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
          data: data.data,
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
    const response = await fetchKecamatan()

    return response
  }
)

const getMasterDesa = createAsyncThunk(
  GET_MASTER_DESA,
  async (kecamatanId: string) => {
    const fetchDesa = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/masters/desa?id_kecamatan=${kecamatanId}`
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
          data: data.data,
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
    const response = await fetchDesa()

    return response
  }
)

const createFarmerLand = createAsyncThunk(
  CREATE_FARMER_LAND,
  async (data: FormPetaniData) => {
    const create = async (data: FormPetaniData) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/farmers`

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          nik: data.nik,
          name: data.name,
          email: data.email,
          phone: data.phone,
          blok_name: data.blok_name,
          large: data.large as number,
          longitude: data.longitude,
          latitude: data.latitude,
          province: {
            id: data.province?.id,
            name: data.province?.name,
          },
          regencies: {
            id: data.regencies?.id,
            name: data.regencies?.name,
          },
          district: {
            id: data.district?.id,
            name: data.district?.name,
          },
          village: {
            id: data.village?.id,
            name: data.village?.name,
          },
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

const getFarmers = createAsyncThunk(GET_ALL_FARMER, async () => {
  const getAll = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/farmers`
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

  const response = await getAll()

  return response
})

const getHarvests = createAsyncThunk(
  GET_ALL_HARVEST,
  async (farmerLandId: string) => {
    const getAll = async (farmerLandId: string) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/harvests?farmer_land_id=${farmerLandId}`
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

const createHarvest = createAsyncThunk(
  CREATE_HARVEST,
  async (data: FormPanenData) => {
    const create = async (data: FormPanenData) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/harvests?farmer_land_id=${data.farmer_land_id}`

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          operating_costs: data.operating_costs,
          harvest_date: data.harvest_date,
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

export {
  convertToIndonesiaTanggal,
  getMasterDesa,
  getMasterKabupaten,
  getMasterKecamatan,
  getMasterProvinsi,
  createFarmerLand,
  getFarmers,
  getHarvests,
  createHarvest,
  ifemptyData,
  priceSplitter,
}
