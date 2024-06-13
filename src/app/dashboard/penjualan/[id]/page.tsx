"use client"

import CardPenjualan from "@/app/ui/cards/CardPenjualan"
import { useAppDispatch, useAppSelector } from "@/helpers/libs/hooks"
import {
  FormPenjualanData,
  UpdateFormPenjualanData,
} from "@/interfaces/FormPenjualan"
import { useEffect, useState } from "react"
import {
  getSellById,
  updateSell,
} from "@/helpers/libs/features/actions/sellingAction"
import {
  GET_SELL_BY_ID_FULFILLED,
  UPDATE_SELL_FULFILLED,
} from "@/helpers/const"
import Loading from "@/app/ui/loading"
import { convertToIndonesiaTanggal, priceSplitter } from "@/helpers/helper"
import Modal from "@/app/ui/modals/Modal"
import FormInputPenjualan from "@/app/ui/forms/FormInputPenjualan"

export default function Page({ params }: { params: { id: string } }) {
  const {
    detail: sellData,
    status: sellStatus,
    type: sellType,
  } = useAppSelector((state) => state.sell)
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const handleSubmitUpdate = async (
    payload: UpdateFormPenjualanData | FormPenjualanData,
    action: any
  ) => {
    setIsLoading(true)
    dispatch(updateSell(payload as UpdateFormPenjualanData))
    action.setSubmitting(true)
  }

  useEffect(() => {
    dispatch(getSellById(params.id))
  }, [])

  useEffect(() => {
    if (sellType == GET_SELL_BY_ID_FULFILLED) {
      setIsLoading(false)
    }
    if (sellType == UPDATE_SELL_FULFILLED) {
      dispatch(getSellById(params.id))
      setIsLoading(false)
      setShowModal(false)
    }
  }, [sellData, sellStatus, sellType])
  return (
    <div className="mx-8 flex flex-col gap-2">
      <Loading show={isLoading} />
      <h1 className="text-3xl font-semibold mt-10">Detail Penjualan</h1>

      <div className="gap-y-8 flex flex-col">
        {sellData != null && (
          <CardPenjualan
            onClick={() => setShowModal(true)}
            name="Nama Customer"
            isDetail={true}
            data={[
              { name: "Pembeli", value: `${sellData.buyer_id.name} (${sellData.buyer_id.agency})` },
              { name: "Jumlah Penjualan", value: `${sellData.amount} (${sellData.unit})` },
              {
                name: "Tanggal Penjualan",
                value: convertToIndonesiaTanggal(sellData.selling_date),
              },
              { name: "Total Harga Penjualan", value: `Rp.${priceSplitter(sellData.price)}` },
            ]}
          />
        )}
      </div>

      {sellData != null ? (
        <Modal isShow={showModal} className="w-modal-3 h-[550px]">
          <FormInputPenjualan
            type="update"
            initialValues={{
              farmer_land_id: sellData.farmer_land_id._id,
              sell_id: params.id,
              name: sellData.name,
              selling_date: sellData.selling_date,
              amount: sellData.amount,
              unit: {
                id: sellData.unit,
                name: sellData.unit == "kg" ? "Kg" : "Ton",
              },
              price: sellData.price,
              proof_payment: sellData.proof_payment,
              buyer_id: sellData.buyer_id,
              commodity_id: sellData.commodity_id,
              cycle_id: sellData.cycle_id
            }}
            onSubmit={handleSubmitUpdate}
            onCloseModal={() => setShowModal(false)}
          />
        </Modal>
      ) : null}
    </div>
  )
}
