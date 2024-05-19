"use client"

import Alert from "@/app/ui/Alert"
import FormInputKegiatan from "@/app/ui/forms/FormInputKegiatan"
import Loading from "@/app/ui/loading"
import Modal from "@/app/ui/modals/Modal"
import {
  DELETE_ACTIVITY_FULFILLED,
  GET_ACTIVITY_BY_ID_FULFILLED,
  UPDATE_ACTIVITY_FULFILLED,
} from "@/helpers/const"
import { convertToIndonesiaTanggal, priceSplitter } from "@/helpers/helper"
import {
  deleteActivity,
  getActivityTypes,
  getActivitytById,
  updateActivity,
} from "@/helpers/libs/features/actions/activityAction"
import { useAppDispatch, useAppSelector } from "@/helpers/libs/hooks"
import {
  FormActivityData,
  UpdateFormActivityData,
} from "@/interfaces/FormActivity"
import { PencilIcon, TrashIcon } from "@heroicons/react/solid"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { id: string } }) {
  const {
    detail: activityData,
    status: activityStatus,
    type: activityType,
    types,
  } = useAppSelector((state) => state.activity)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const handleSubmitUpdate = async (
    payload: UpdateFormActivityData | FormActivityData,
    action: any
  ) => {
    setIsLoading(true)
    dispatch(updateActivity(payload as UpdateFormActivityData))
    action.setSubmitting(true)
  }

  const handleDelete = () => {
    setIsLoading(true)
    dispatch(deleteActivity(params.id))
  }

  useEffect(() => {
    dispatch(getActivitytById(params.id))
  }, [])

  useEffect(() => {
    if (types.length == 0) {
      dispatch(getActivityTypes())
    }
    if (activityType == GET_ACTIVITY_BY_ID_FULFILLED) {
      setIsLoading(false)
    }
    if (activityType == UPDATE_ACTIVITY_FULFILLED) {
      dispatch(getActivitytById(params.id))
      setIsLoading(false)
      setShowModal(false)
    }
    if (activityType == DELETE_ACTIVITY_FULFILLED) {
      router.push(
        `/dashboard/kegiatan?farmer_land_id=${searchParams.get("farmer_land_id")}`
      )
    }
  }, [
    activityData,
    activityStatus,
    activityType,
    router,
    showAlert,
    params.id,
    searchParams,
  ])
  return (
    <div className="mx-8 flex flex-col gap-2">
      <Alert
        show={showAlert}
        status="confirmation"
        title="Apakah anda yakin ingin menghapus kegiatan ini?"
        content="Jika setuju, kegiatan ini akan dihapus."
        labelPositive="Ya, hapus"
        labelNegative="Tidak"
        onClickNegative={() => setShowAlert(false)}
        onClickPositive={handleDelete}
      />
      <Loading show={isLoading} />
      <h1 className="text-3xl font-semibold mt-10">Detail Kegiatan</h1>
      {activityData != null ? (
        <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
          <div className="flex flex-row justify-between">
            <div
              className="flex flex-row gap-x-2.5 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <PencilIcon className="w-4 text-tand-1 flex-none" />
              <span className="text-base text-tand-1 font-semibold flex-initial">
                Ubah
              </span>
            </div>
            <div
              className="flex flex-row gap-x-2.5 cursor-pointer"
              onClick={() => setShowAlert(true)}
            >
              <TrashIcon className="w-4 text-tand-error flex-none" />
              <span className="text-base text-tand-error font-semibold flex-initial">
                Hapus
              </span>
            </div>
          </div>
          <div className="w-full h-[1px] bg-[#EEEEEE] my-4" />
          <div className="flex flex-row">
            <div className="flex flex-1 flex-col justify-center gap-y-1.5">
              <span className="text-lg font-medium text-tand-appr-1 capitalize">
                {activityData.type_activity.name}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-y-1.5">
              <span className="text-xs font-normal text-tand-appr-2">
                Tanggal Kegiatan
              </span>
              <span className="text-sm font-medium text-tand-appr-1">
                {convertToIndonesiaTanggal(activityData.activity_date)}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-y-1.5">
              <span className="text-xs font-normal text-tand-appr-2">
                Biaya Operasional
              </span>
              <span className="text-sm font-medium text-tand-appr-1">
                Rp. {priceSplitter(activityData.operating_costs)}
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {activityData != null ? (
        <Modal isShow={showModal} className="w-modal-3 h-[550px]">
          <FormInputKegiatan
            type="update"
            initialValues={{
              activity_id: activityData._id,
              farmer_land_id: activityData.farmer_land_id._id,
              type_activity: activityData.type_activity,
              activity_date: activityData.activity_date,
              amount: activityData.amount,
              brand: activityData.brand,
              unit:
                activityData.unit != null
                  ? {
                      id: activityData.unit,
                      name:
                        activityData.unit.charAt(0).toUpperCase() +
                        activityData.unit.slice(1),
                    }
                  : null,
              operating_costs: activityData.operating_costs,
              treatment: activityData.treatment,
            }}
            types={types}
            onSubmit={handleSubmitUpdate}
            onCloseModal={() => setShowModal(false)}
          />
        </Modal>
      ) : null}
    </div>
  )
}
