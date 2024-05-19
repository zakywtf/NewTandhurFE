"use client"
import "@/styles/calendar.css"
import Button from "@/app/ui/fields/Button"
import FormInputKegiatan from "@/app/ui/forms/FormInputKegiatan"
import Loading from "@/app/ui/loading"
import Modal from "@/app/ui/modals/Modal"
import {
  CREATE_ACTIVITY_FULFILLED,
  DELETE_ACTIVITY_FULFILLED,
  GET_ACTIVITY_BY_ID_FULFILLED,
  GET_ALL_ACTIVITY_FULFILLED,
  INIT,
  UPDATE_ACTIVITY_FULFILLED,
} from "@/helpers/const"
import {
  createActivity,
  getActivities,
  getActivityTypes,
} from "@/helpers/libs/features/actions/activityAction"
import { useAppDispatch, useAppSelector } from "@/helpers/libs/hooks"
import { FormActivityData } from "@/interfaces/FormActivity"
import { PlusIcon } from "@heroicons/react/solid"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Calendar, { TileArgs } from "react-calendar"
import moment from "moment"

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function Page() {
  const dispatch = useAppDispatch()
  const {
    data: activities,
    type: activityType,
    status: activityStatus,
    types,
  } = useAppSelector((state) => state.activity)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, onChange] = useState<Value>(new Date())
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activityDates, setActivityDates] = useState<string[]>([])

  const handleSubmitCreate = async (payload: FormActivityData, action: any) => {
    setIsLoading(true)
    const farmerLandId = searchParams.get("farmer_land_id")
    payload.farmer_land_id = farmerLandId ?? ""

    dispatch(createActivity(payload))

    action.setSubmitting(true)
  }

  const hightlightDates = ({ activeStartDate, date, view }: TileArgs) => {
    if (activities.length != 0) {
      const customDate = moment(date).format("YYYY-MM-DD")
      const isFind =
        activities.find(
          (activity) =>
            moment(activity.activity_date).format("YYYY-MM-DD") == customDate
        ) ?? null

      if (isFind) {
        return "react-calendar-highlight-date"
      }

      return null
    }

    return null
  }

  useEffect(() => {
    const farmerLandId = searchParams.get("farmer_land_id") ?? ""
    if (activityType == GET_ALL_ACTIVITY_FULFILLED) {
      setShowModal(false)
      // if (activities.length != 0) {
      //   const dates = activities.map((activity) =>
      //     moment(activity.activity_date).format("YYYY-MM-DD")
      //   )
      //   setActivityDates(dates)
      // }
      setIsLoading(false)
    }

    if (
      (activityType == CREATE_ACTIVITY_FULFILLED ||
        activityType == UPDATE_ACTIVITY_FULFILLED ||
        activityType == DELETE_ACTIVITY_FULFILLED ||
        activityType == GET_ACTIVITY_BY_ID_FULFILLED) &&
      types.length != 0
    ) {
      dispatch(getActivities(farmerLandId))
      setIsLoading(false)
    }
    if (activityType == INIT && activities.length == 0 && types.length == 0) {
      dispatch(getActivities(farmerLandId))
      dispatch(getActivityTypes())
    }
  }, [activities, activityType, activityStatus])

  return (
    <div className="mx-8 flex flex-col gap-2">
      <Loading show={isLoading} />
      <div className="flex justify-between mt-10">
        <h2 className="text-3xl font-semibold mt-2">Daftar Kegiatan</h2>
        <Button
          buttonType="primary"
          label="Tambah Kegiatan"
          disabled={false}
          className="ml-auto px-4"
          width="auto"
          icon={<PlusIcon className="w-3 h-3 mr-2.5" />}
          onClick={() => setShowModal(true)}
        />
      </div>

      <div className="gap-y-8 flex flex-col">
        <Calendar
          onChange={onChange}
          value={value}
          tileClassName={hightlightDates}
          onClickDay={(value) => {
            if (activities.length != 0) {
              const customDate = moment(value).format("YYYY-MM-DD")
              const activity =
                activities.find(
                  (activity) =>
                    moment(activity.activity_date).format("YYYY-MM-DD") ==
                    customDate
                ) ?? null

              if (activity) {
                router.push(
                  `kegiatan/${activity._id}?farmer_land_id=${searchParams.get(
                    "farmer_land_id"
                  )}`
                )
              }
            }
          }}
        />
      </div>

      <Modal isShow={showModal} className="w-modal-3 h-[550px]">
        <FormInputKegiatan
          type="create"
          initialValues={{
            farmer_land_id: "",
            type_activity: null,
            activity_date: "",
            amount: null,
            brand: "",
            unit: null,
            operating_costs: 0,
            treatment: "",
          }}
          types={types}
          onSubmit={handleSubmitCreate}
          onCloseModal={() => setShowModal(false)}
        />
      </Modal>
    </div>
  )
}
