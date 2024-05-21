"use client"

import {
  CREATE_FARMER_LAND_FULFILLED,
  GET_ALL_FARMER_FULFILLED,
  INIT,
} from "@/helpers/const"
import { createFarmerLand, getFarmers } from "@/helpers/helper"
import {
  useAppDispatch,
  useAppSelector,
  useCommodity,
} from "@/helpers/libs/hooks"
import { FormPetaniData } from "@/interfaces/FormPetani"
import { PlusIcon } from "@heroicons/react/solid"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Card from "./ui/cards/Card"
import Button from "./ui/fields/Button"
import FormInputPetani from "./ui/forms/FormInputPetani"
import Loading from "./ui/loading"
import Modal from "./ui/modals/Modal"
import CardPagination from "./ui/paginations/CardPagination"

export default function Page() {
  const {
    total_item: farmerLandTotalItems,
    data: farmerLandData,
    status: farmerLandStatus,
    type: farmerLandType,
  } = useAppSelector((state) => state.farmerland)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [paginationData, setPaginationData] = useState<{
    page: number
    isHidden: boolean
    isMaxPage: boolean
    items: any[]
  }>({ page: 1, isHidden: true, isMaxPage: false, items: [] })

  const selectedCommodity = useCommodity()

  const handleSubmitCreateFarmerLand = async (
    payload: FormPetaniData,
    action: any
  ) => {
    setIsLoading(true)
    dispatch(createFarmerLand(payload))
    setShowModal(false)
    action.setSubmitting(true)
  }

  const handleClick = (id: string, farmerName: string) => {
    setCookie("farmer", farmerName, {
      maxAge: 60 * 60 * 24,
    })
    router.push(`/dashboard?farmer_land_id=${id}`)
  }

  useEffect(() => {
    if (selectedCommodity) {
      setIsLoading(true)
    }
    if (farmerLandType == INIT) {
      dispatch(getFarmers({ page: 1, limit: 10 }))
      setIsLoading(true)
    }
    if (farmerLandType == CREATE_FARMER_LAND_FULFILLED) {
      dispatch(getFarmers({ page: 1, limit: 10 }))
      setIsLoading(false)
    }
    if (farmerLandType == GET_ALL_FARMER_FULFILLED) {
      setIsLoading(false)
    }
  }, [farmerLandData, farmerLandStatus, farmerLandType, farmerLandTotalItems])

  useEffect(() => {
    if (
      farmerLandType == GET_ALL_FARMER_FULFILLED &&
      paginationData.items.length != 0
    ) {
      const farmerLands = paginationData.items.concat(farmerLandData)

      if (farmerLands.length <= farmerLandTotalItems) {
        setPaginationData((prevState) => {
          return {
            ...prevState,
            items: prevState.items.concat(farmerLandData),
          }
        })
      }

      if (
        paginationData.items.length == farmerLandTotalItems &&
        paginationData.isMaxPage == false
      ) {
        setPaginationData((prevState) => {
          return {
            ...prevState,
            isMaxPage: true,
          }
        })
      }
    } else if (
      farmerLandType == GET_ALL_FARMER_FULFILLED &&
      paginationData.items.length == 0
    ) {
      setPaginationData((prevState) => {
        return {
          ...prevState,
          items: farmerLandData,
        }
      })
    }
  }, [paginationData, farmerLandTotalItems, farmerLandData])


  return (
    <main className="w-[90%] mx-auto min-h-screen">
      <Loading show={isLoading} />
      <h1 className="text-3xl font-semibold mt-10">
        Komoditas{" "}
        {selectedCommodity == null ? "Belum Dipilih" : selectedCommodity.name}
      </h1>
      <div className="flex flex-row items-center justify-between mt-3.5 mb-8">
        <span className="text-2xl font-semibold text-tand-appr-1 ">
          Pilih Data Petani
        </span>
        <Button
          buttonType="primary"
          label="Tambah Lahan"
          disabled={false}
          className="ml-auto px-4"
          width="auto"
          icon={<PlusIcon className="w-3 h-3 mr-2.5" />}
          onClick={() => setShowModal(true)}
        />
      </div>

      <div className="gap-y-8 flex flex-col">
        {paginationData.isHidden
          ? paginationData.items.slice(0, 2).map((farmer, index) => {
              return (
                <Card
                  key={index}
                  id={farmer._id}
                  name={`Lahan ${farmer.farmer_id.name}`}
                  data={[
                    {
                      name: "Longitude & latitude",
                      value: `${farmer.longitude} & ${farmer.latitude}`,
                    },
                    { name: "Luasan Lahan (ha)", value: farmer.large },
                  ]}
                  onClick={() => handleClick(farmer._id, farmer.farmer_id.name)}
                />
              )
            })
          : paginationData.items.map((farmer, index) => {
              return (
                <Card
                  key={index}
                  id={farmer._id}
                  name={`Lahan ${farmer.farmer_id.name}`}
                  data={[
                    {
                      name: "Longitude & latitude",
                      value: `${farmer.longitude} & ${farmer.latitude}`,
                    },
                    { name: "Luasan Lahan (ha)", value: farmer.large },
                  ]}
                  onClick={() => handleClick(farmer._id, farmer.farmer_id.name)}
                />
              )
            })}
      </div>

      {paginationData.isMaxPage == false ? (
        <CardPagination
          onClick={() => {
            if (paginationData.isHidden == true) {
              setPaginationData((prevState) => {
                return {
                  ...prevState,
                  isHidden: false,
                }
              })
            } else {
              setIsLoading(true)
              dispatch(getFarmers({ page: paginationData.page + 1, limit: 10 }))
              setPaginationData((prevState) => {
                return {
                  ...prevState,
                  page: prevState.page + 1,
                }
              })
            }
          }}
        />
      ) : null}

      <Modal isShow={showModal} className="w-modal-3 h-[550px]">
        <FormInputPetani
          type="create"
          initialValues={{
            name: "",
            blok_name: "",
            email: "",
            phone: "",
            large: 0,
            nik: "",
            latitude: 0,
            longitude: 0,
            province: null,
            regencies: null,
            district: null,
            village: null,
          }}
          onSubmit={handleSubmitCreateFarmerLand}
          onCloseModal={() => setShowModal(false)}
        />
      </Modal>
    </main>
  )
}