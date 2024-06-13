"use client"

import Alert from "@/app/ui/Alert"
import CardPanen from "@/app/ui/cards/CardPanen"
import Button from "@/app/ui/fields/Button"
import FormInputPanen from "@/app/ui/forms/FormInputPanen"
import Loading from "@/app/ui/loading"
import Modal from "@/app/ui/modals/Modal"
import CardPagination from "@/app/ui/paginations/CardPagination"
import {
  CREATE_HARVEST_FULFILLED,
  GET_ALL_HARVEST_FULFILLED,
  GET_HARVEST_BY_ID_FULFILLED,
  INIT,
  STOP_CYCLE_FULFILLED,
  STOP_HARVEST_FULFILLED,
  UPDATE_HARVEST_FULFILLED,
} from "@/helpers/const"
import {
  convertToIndonesiaTanggal,
  createHarvest,
  getHarvests,
} from "@/helpers/helper"
import { stopCycle } from "@/helpers/libs/features/actions/cycleAction"
import { getActiveCycle } from "@/helpers/libs/features/actions/historyAction"
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
    total_item: harvestTotalItems,
  } = useAppSelector((state) => state.harvest)

  const dispatch = useAppDispatch()
  const farmer = useFarmer()
  const searchParams = useSearchParams()
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showAlert, setShowAlert] = useState(false)
  const { type, status, data } = useAppSelector((state) => state.history)
  const [paginationData, setPaginationData] = useState<{
    page: number
    isHidden: boolean
    isMaxPage: boolean
    items: any[]
  }>({ page: 1, isHidden: true, isMaxPage: false, items: [] })

  const handleSubmitCreate = async (payload: FormPanenData, action: any) => {
    setIsLoading(true)
    const farmerLandId = searchParams.get("farmer_land_id")
    payload.farmer_land_id = farmerLandId ?? ""
    dispatch(createHarvest(payload))

    action.setSubmitting(true)
  }

  const handleStopCycle = () => {
    dispatch(stopCycle())
    setIsLoading(true)
    setShowAlert(false)
  }

  useEffect(() => {
    const farmerLandId = searchParams.get("farmer_land_id")
    if (farmer && farmerLandId && type == INIT) {
      dispatch(getActiveCycle(farmerLandId))
    }
    if (type == STOP_CYCLE_FULFILLED) {
      setIsLoading(false)
    }
  }, [type, farmer, status, data])

  useEffect(() => {
    const farmerLandId = searchParams.get("farmer_land_id")
    if (farmerLandId) {
      if (harvestType == INIT) {
        dispatch(
          getHarvests({ page: 1, limit: 10, farmer_land_id: farmerLandId })
        )
      }
      if (harvestType == GET_ALL_HARVEST_FULFILLED) {
        setIsLoading(false)
      }
      if (harvestType == CREATE_HARVEST_FULFILLED) {
        setPaginationData({
          page: 1,
          isHidden: true,
          isMaxPage: false,
          items: [],
        })
        dispatch(
          getHarvests({ page: 1, limit: 10, farmer_land_id: farmerLandId })
        )

        setIsLoading(false)
        setShowModal(false)
      }
      if (
        harvestType == GET_HARVEST_BY_ID_FULFILLED ||
        harvestType == UPDATE_HARVEST_FULFILLED ||
        harvestType == STOP_HARVEST_FULFILLED
      ) {
        setPaginationData({
          page: 1,
          isHidden: true,
          isMaxPage: false,
          items: [],
        })
        dispatch(
          getHarvests({ page: 1, limit: 10, farmer_land_id: farmerLandId })
        )
      }
    }
  }, [harvestData, harvestStatus, harvestType])

  useEffect(() => {
    if (harvestType == GET_ALL_HARVEST_FULFILLED) {
      const harvests = paginationData.items.concat(harvestData)

      if (harvests.length != 0 && harvests.length <= harvestTotalItems) {
        if (
          harvests.length == harvestTotalItems &&
          paginationData.isMaxPage == false &&
          paginationData.isHidden == false
        ) {
          setPaginationData((prevState) => {
            return {
              ...prevState,
              items: harvests,
              isMaxPage: true,
            }
          })
        }
        if (
          harvests.length == harvestTotalItems &&
          paginationData.isMaxPage == false &&
          paginationData.isHidden == true
        ) {
          setPaginationData((prevState) => {
            return {
              ...prevState,
              items: harvests,
            }
          })
        }
        if (
          harvests.length < harvestTotalItems &&
          paginationData.isMaxPage == false
        ) {
          setPaginationData((prevState) => {
            return {
              ...prevState,
              items: harvests,
            }
          })
        }
      }
    }
  }, [paginationData, harvestTotalItems, harvestData, searchParams])

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
        onClickPositive={handleStopCycle}
      />
      <Loading show={isLoading} />
      <h1 className="text-3xl font-semibold mt-10">Daftar Pemanenan</h1>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mt-2">
          {farmer == null ? "Lahan Belum Dipilih" : `${farmer.farmerLand}`}
        </h2>
        <div className="flex gap-4">
          {data && (
            <Button
              buttonType="primary"
              label="Selesai Siklus"
              disabled={false}
              className="px-4 bg-tand-error shadow-none text-black hover:bg-tand-error active:bg-tand-error"
              width="auto"
              onClick={() => setShowAlert(true)}
            />
          )}
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
      </div>

      <div className="gap-y-8 flex flex-col">
        {paginationData.isHidden
          ? paginationData.items.slice(0, 2).map((harvest, index) => {
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
                />
              )
            })
          : paginationData.items.map((harvest, index) => {
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
                />
              )
            })}
      </div>

      {paginationData.isMaxPage == false && harvestData.length != 0 ? (
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
              const farmerLandId = searchParams.get("farmer_land_id") ?? ""
              dispatch(
                getHarvests({
                  page: paginationData.page + 1,
                  limit: 10,
                  farmer_land_id: farmerLandId,
                })
              )
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
