"use client"

import CardPanen from "@/app/ui/cards/CardPanen"
import CardPenjualan from "@/app/ui/cards/CardPenjualan"
import Button from "@/app/ui/fields/Button"
import FormInputPanen from "@/app/ui/forms/FormInputPanen"
import FormInputPenjualan from "@/app/ui/forms/FormInputPenjualan"
import Loading from "@/app/ui/loading"
import Modal from "@/app/ui/modals/Modal"
import {
  CREATE_HARVEST_FULFILLED,
  CREATE_SELL_FULFILLED,
  GET_ALL_HARVEST_FULFILLED,
  GET_ALL_SELL_FULFILLED,
  GET_HARVEST_BY_ID_FULFILLED,
  GET_SELL_BY_ID_FULFILLED,
  INIT,
  UPDATE_HARVEST_FULFILLED,
  UPDATE_SELL_FULFILLED,
} from "@/helpers/const"
import {
  convertToIndonesiaTanggal,
  createHarvest,
  getHarvests,
} from "@/helpers/helper"
import {
  createSell,
  getSells,
} from "@/helpers/libs/features/actions/sellingAction"
import { useAppDispatch, useAppSelector } from "@/helpers/libs/hooks"
import { FormPanenData } from "@/interfaces/FormPanen"
import { FormPenjualanData } from "@/interfaces/FormPenjualan"
import { PlusIcon } from "@heroicons/react/solid"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
  const {
    data: harvestData,
    status: harvestStatus,
    type: harvestType,
  } = useAppSelector((state) => state.harvest)

  const {
    data: sellData,
    status: sellStatus,
    type: sellType,
  } = useAppSelector((state) => state.sell)

  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const [showModal, setShowModal] = useState(false)
  const [showSellModal, setShowSellModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleSubmitCreate = async (payload: FormPanenData, action: any) => {
    setIsLoading(true)
    const farmerLandId = searchParams.get("farmer_land_id")
    payload.farmer_land_id = farmerLandId ?? ""
    dispatch(createHarvest(payload))

    action.setSubmitting(true)
  }

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
      if (harvestType == INIT && sellType == INIT) {
        dispatch(getSells(farmerLandId))
        dispatch(getHarvests(farmerLandId))
      }

      if (harvestType == GET_ALL_HARVEST_FULFILLED) {
        setIsLoading(false)
      }
      if (harvestType == CREATE_HARVEST_FULFILLED) {
        dispatch(getHarvests(farmerLandId))
        setIsLoading(false)
        setShowModal(false)
      }
      if (
        harvestType == GET_HARVEST_BY_ID_FULFILLED ||
        harvestType == UPDATE_HARVEST_FULFILLED
      ) {
        dispatch(getHarvests(farmerLandId))
      }
    }
  }, [harvestData, harvestStatus, harvestType])

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
      <h1 className="text-3xl font-semibold mt-10">Daftar Pemanenan</h1>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mt-2">Petani A [Nama petani]</h2>
        <Button
          buttonType="primary"
          label="Tambah Hasil Panen"
          disabled={false}
          className="ml-auto px-4"
          width="auto"
          icon={<PlusIcon className="w-3 h-3 mr-2.5" />}
          onClick={() => setShowModal(true)}
        />
      </div>

      <div className="gap-y-8 flex flex-col">
        {harvestData.map((harvest) => {
          return (
            <CardPanen
              key={crypto.randomUUID()}
              link={`panen/${harvest._id}?farmer_land_id=${searchParams.get(
                "farmer_land_id"
              )}`}
              name={harvest.name}
              data={[
                {
                  name: "Tanggal Panen",
                  value: convertToIndonesiaTanggal(harvest.harvest_date),
                },
                {
                  name: "Hasil Panen",
                  value: `${harvest.amount} ${harvest.unit}`,
                },
              ]}
            />
          )
        })}
      </div>

      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mt-2">Daftar Penjualan</h2>
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
              link={`panen/penjualan/${sell._id}?farmer_land_id=${searchParams.get(
                "farmer_land_id"
              )}`}
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

      <Modal isShow={showModal} className="w-modal-3 h-[550px]">
        <FormInputPanen
          initialValues={{
            farmer_land_id: "",
            harvest_date: "",
            amount: 0,
            unit: null,
            harvest_id: "",
            name: "",
            operating_costs: 0
          }}
          onSubmit={handleSubmitCreate}
          onCloseModal={() => setShowSellModal(false)}
        />
      </Modal>
    </div>
  )
}
