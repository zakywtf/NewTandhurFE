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
import { useEffect, useState } from "react"
import Card from "./ui/cards/Card"
import Button from "./ui/fields/Button"
import FormInputPetani from "./ui/forms/FormInputPetani"
import Loading from "./ui/loading"
import Modal from "./ui/modals/Modal"

export default function Page() {
  const {
    data: farmerLandData,
    status: farmerLandStatus,
    type: farmerLandType,
  } = useAppSelector((state) => state.farmerland)
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const selectedCommodity = useCommodity()

  const handleSubmitCreateFarmerLand = async (
    payload: FormPetaniData,
    action: any
  ) => {
    setIsLoading(true)

    dispatch(createFarmerLand(payload))

    action.setSubmitting(true)
  }

  useEffect(() => {
    if (selectedCommodity) {
      setIsLoading(true)
    }
    if (farmerLandType == INIT) {
      dispatch(getFarmers())
      setIsLoading(true)
    }
    if (farmerLandType == CREATE_FARMER_LAND_FULFILLED) {
      dispatch(getFarmers())
      setShowModal(false)
      setIsLoading(false)
    }
    if (farmerLandType == GET_ALL_FARMER_FULFILLED) {
      setIsLoading(false)
    }
  }, [farmerLandData, farmerLandStatus, farmerLandType])

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
        {farmerLandData.map((farmer, index) => {
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
            />
          )
        })}
      </div>

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
            latitude: -7.74223636954,
            longitude: 110.482076919,
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
