"use client"

import CardPenjualan from "@/app/ui/cards/CardPenjualan"
import Button from "@/app/ui/fields/Button"
import FormInputPenjualan from "@/app/ui/forms/FormInputPenjualan"
import Loading from "@/app/ui/loading"
import Modal from "@/app/ui/modals/Modal"
import {
    CREATE_SELL_FULFILLED,
    GET_ALL_SELL_FULFILLED,
    GET_SELL_BY_ID_FULFILLED,
    INIT,
    UPDATE_SELL_FULFILLED
} from "@/helpers/const"
import {
    convertToIndonesiaTanggal
} from "@/helpers/helper"
import {
    createSell,
    getSells,
} from "@/helpers/libs/features/actions/sellingAction"
import { useAppDispatch, useAppSelector, useFarmer } from "@/helpers/libs/hooks"
import { FormPenjualanData } from "@/interfaces/FormPenjualan"
import { PlusIcon } from "@heroicons/react/solid"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
  const {
    data: sellData,
    status: sellStatus,
    type: sellType,
  } = useAppSelector((state) => state.sell)

  const dispatch = useAppDispatch()
  const farmer = useFarmer()
  const searchParams = useSearchParams()
  const [showSellModal, setShowSellModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleSubmitCreateSell = async (
    payload: FormPenjualanData,
    action: any
  ) => {
    setIsLoading(true)
    const farmerLandId = searchParams.get("farmer_land_id")
    payload.farmer_land_id = farmerLandId ?? ""
    dispatch(createSell(payload))

    action.setSubmitting(true)
  }

  useEffect(() => {
    const farmerLandId = searchParams.get("farmer_land_id")
    if (farmerLandId) {
      if (sellType == INIT) {
        dispatch(getSells(farmerLandId))
      }

      if (sellType == GET_ALL_SELL_FULFILLED) {
        setIsLoading(false)
      }
      if (sellType == CREATE_SELL_FULFILLED) {
        dispatch(getSells(farmerLandId))
        setIsLoading(false)
        setShowSellModal(false)
      }
      if (
        sellType == GET_SELL_BY_ID_FULFILLED ||
        sellType == UPDATE_SELL_FULFILLED
      ) {
        dispatch(getSells(farmerLandId))
      }
    }
  }, [sellData, sellStatus, sellType])

  return (
    <div className="mx-8 flex flex-col gap-2">
      
      <Loading show={isLoading} />
      <h1 className="text-3xl font-semibold mt-10">Daftar Penjualan</h1>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mt-2">
          {farmer == null ? "Petani Belum Dipilih" : `Petani ${farmer}`}
        </h2>
      </div>

      <div className="flex justify-end">
        <Button
          buttonType="primary"
          label="Tambah Penjualan"
          disabled={false}
          className="ml-auto px-4"
          width="auto"
          icon={<PlusIcon className="w-3 h-3 mr-2.5" />}
          onClick={() => setShowSellModal(true)}
        />
      </div>
      <div className="gap-y-8 flex flex-col">
        {sellData.map((sell) => {
          return (
            <CardPenjualan
              key={crypto.randomUUID()}
              link={`penjualan/${
                sell._id
              }?farmer_land_id=${searchParams.get("farmer_land_id")}`}
              name={sell.distributor}
              data={[
                { name: "Distributor/pembeli", value: sell.distributor },
                {
                  name: "Tanggal Penjualan",
                  value: convertToIndonesiaTanggal(sell.selling_date),
                },
                { name: "Total Harga Penjualan", value: sell.price },
              ]}
            />
          )
        })}
      </div>

      <Modal isShow={showSellModal} className="w-modal-3 h-[550px]">
        <FormInputPenjualan
          initialValues={{
            farmer_land_id: "",
            distributor: "",
            selling_date: "",
            amount: 0,
            unit: null,
            price: 0,
            proof_payment: null,
          }}
          onSubmit={handleSubmitCreateSell}
          onCloseModal={() => setShowSellModal(false)}
        />
      </Modal>
    </div>
  )
}
