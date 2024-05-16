"use client"

import CardPanen from "@/app/ui/cards/CardPanen"
import FormInputPanen from "@/app/ui/forms/FormInputPanen"
import Loading from "@/app/ui/loading"
import Modal from "@/app/ui/modals/Modal"
import { GET_HARVEST_BY_ID_FULFILLED, UPDATE_HARVEST_FULFILLED } from "@/helpers/const"
import { convertToIndonesiaTanggal, priceSplitter } from "@/helpers/helper"
import { getHarvestById, updateHarvest } from "@/helpers/libs/features/actions/harvestAction"
import { useAppDispatch, useAppSelector } from "@/helpers/libs/hooks"
import { FormPanenData, UpdateFormPanenData } from "@/interfaces/FormPanen"
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { id: string } }) {
  const {
    detail: harvestData,
    status: harvestStatus,
    type: harvestType,
  } = useAppSelector((state) => state.harvest)
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const handleSubmitUpdate = async (payload: UpdateFormPanenData | FormPanenData, action: any) => {
    setIsLoading(true)
    dispatch(updateHarvest(payload as UpdateFormPanenData))
    action.setSubmitting(true)
  }

  useEffect(() => {
    dispatch(getHarvestById(params.id))
  }, [])

  useEffect(() => {
    if (harvestType == GET_HARVEST_BY_ID_FULFILLED) {
      setIsLoading(false)
    }
    if (harvestType == UPDATE_HARVEST_FULFILLED) {
      dispatch(getHarvestById(params.id))
      setIsLoading(false)
      setShowModal(false)
    }
  }, [harvestData, harvestStatus, harvestType])
  return (
    <div className="mx-8 flex flex-col gap-2">
      <Loading show={isLoading} />
      <h1 className="text-3xl font-semibold mt-10">Detail Pemanen</h1>
      {harvestData != null ? (
        <CardPanen
          onClick={() => setShowModal(true)}
          name={harvestData.name}
          isDetail={true}
          data={[
            {
              name: "Tanggal Panen",
              value: convertToIndonesiaTanggal(harvestData.harvest_date),
            },
            {
              name: "Hasil Panen",
              value: `${harvestData.amount} ${harvestData.unit}`,
            },
            {
              name: "Biaya Operasional",
              value: `Rp. ${priceSplitter(harvestData.operating_costs)}`,
            },
          ]}
        />
      ) : null}

      {harvestData != null ? (
        <Modal isShow={showModal} className="w-modal-3 h-[550px]">
          <FormInputPanen
            type="update"
            initialValues={{
              farmer_land_id: harvestData.farmer_land_id._id,
              harvest_id: params.id,
              name: harvestData.name,
              harvest_date: harvestData.harvest_date,
              amount: harvestData.amount,
              unit: {
                id: harvestData.unit,
                name: harvestData.unit == "kg" ? "Kg" : "Ton",
              },
              operating_costs: harvestData.operating_costs,
            }}
            onSubmit={handleSubmitUpdate}
            onCloseModal={() => setShowModal(false)}
          />
        </Modal>
      ) : null}
    </div>
  )
}
