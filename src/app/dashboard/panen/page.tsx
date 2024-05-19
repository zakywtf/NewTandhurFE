"use client"

import Alert from "@/app/ui/Alert"
import CardPanen from "@/app/ui/cards/CardPanen"
import Button from "@/app/ui/fields/Button"
import FormInputPanen from "@/app/ui/forms/FormInputPanen"
import Loading from "@/app/ui/loading"
import Modal from "@/app/ui/modals/Modal"
import {
  CREATE_HARVEST_FULFILLED,
  GET_ALL_HARVEST_FULFILLED,
  GET_HARVEST_BY_ID_FULFILLED,
  INIT,
  STOP_HARVEST_FULFILLED,
  UPDATE_HARVEST_FULFILLED
} from "@/helpers/const"
import {
  convertToIndonesiaTanggal,
  createHarvest,
  getHarvests,
} from "@/helpers/helper"
import { stopHarvest } from "@/helpers/libs/features/actions/harvestAction"
import {
  getSells
} from "@/helpers/libs/features/actions/sellingAction"
import { useAppDispatch, useAppSelector, useFarmer } from "@/helpers/libs/hooks"
import { FormPanenData } from "@/interfaces/FormPanen"
import { PlusIcon } from "@heroicons/react/solid"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
  const {
    data: harvestData,
    status: harvestStatus,
    type: harvestType,
  } = useAppSelector((state) => state.harvest)

  const dispatch = useAppDispatch()
  const farmer = useFarmer()
  const searchParams = useSearchParams()
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showAlert, setShowAlert] = useState(false)
  const [harvestId, setHarvestId] = useState(null)

  const handleSubmitCreate = async (payload: FormPanenData, action: any) => {
    setIsLoading(true)
    const farmerLandId = searchParams.get("farmer_land_id")
    payload.farmer_land_id = farmerLandId ?? ""
    dispatch(createHarvest(payload))

    action.setSubmitting(true)
  }

  const handleStopCultivation = () => {
    if (harvestId) {
      dispatch(stopHarvest(harvestId))
      setIsLoading(true)
      setShowAlert(false)
    }
  }

  useEffect(() => {
    const farmerLandId = searchParams.get("farmer_land_id")
    if (farmerLandId) {
      if (harvestType == INIT) {
        dispatch(getSells(farmerLandId))
        dispatch(getHarvests(farmerLandId))
      }

      if (harvestType == GET_ALL_HARVEST_FULFILLED) {
        setIsLoading(false)
        setHarvestId(null)
      }
      if (harvestType == CREATE_HARVEST_FULFILLED) {
        dispatch(getHarvests(farmerLandId))
        setIsLoading(false)
        setShowModal(false)
      }
      if (
        harvestType == GET_HARVEST_BY_ID_FULFILLED ||
        harvestType == UPDATE_HARVEST_FULFILLED ||
        harvestType == STOP_HARVEST_FULFILLED
      ) {
        dispatch(getHarvests(farmerLandId))
      }
    }
  }, [harvestData, harvestStatus, harvestType])

  return (
    <div className="mx-8 flex flex-col gap-2">
      <Alert
        show={showAlert}
        status="confirmation"
        title="Apakah anda yakin ingin menghentikan proses ini?"
        content="Jika setuju, proses ini akan dihentikan."
        labelPositive="Ya, hentikan"
        labelNegative="Tidak"
        onClickNegative={() => setShowAlert(false)}
        onClickPositive={handleStopCultivation}
      />
      <Loading show={isLoading} />
      <h1 className="text-3xl font-semibold mt-10">Daftar Pemanenan</h1>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mt-2">
          {farmer == null ? "Petani Belum Dipilih" : `Petani ${farmer}`}
        </h2>
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
              isStop={harvest.isStopCultivation}
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
              handleStop={() => {
                setHarvestId(harvest._id)
                setShowAlert(true)
              }}
            />
          )
        })}
      </div>

      <Modal isShow={showModal} className="w-modal-3 h-[550px]">
        <FormInputPanen
          initialValues={{
            farmer_land_id: "",
            harvest_date: "",
            amount: 0,
            unit: null,
            harvest_id: "",
            name: "",
            operating_costs: 0,
          }}
          onSubmit={handleSubmitCreate}
          onCloseModal={() => setShowModal(false)}
        />
      </Modal>
    </div>
  )
}
