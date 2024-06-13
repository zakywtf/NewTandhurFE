"use client"

import {
  GET_ALL_CYCLE_FULFILLED,
  GET_SUMMARY_DASHBOARD_FULFILLED,
  RESET_STATE,
} from "@/helpers/const"
import { useAppDispatch, useAppSelector, useFarmer } from "@/helpers/libs/hooks"
import { ChevronDoubleLeftIcon } from "@heroicons/react/solid"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import HarvestLineChart from "../ui/charts/HarvestChart"
import IncomeLineChart from "../ui/charts/IncomeChart"
import OutcomeLineChart from "../ui/charts/OutcomeChart"
import Loading from "../ui/loading"
import AutoCompleteSearchField from "../ui/autocompletes/AutoCompleteSearchField"
import { getCycles } from "@/helpers/libs/features/actions/cycleAction"
import { Form, Formik, FormikProps } from "formik"
import * as Yup from "yup"
import { getSummaryDashboard } from "@/helpers/libs/features/actions/dashboardAction"
import { ifemptyData } from "@/helpers/helper"

export default function Page() {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const router = useRouter()
  const farmer = useFarmer()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCycle, setSelectedCycle] = useState({
    _id: "",
    name: "",
  })
  const farmerLandId = searchParams.get("farmer_land_id")

  const { status, type, summary_data } = useAppSelector(
    (state) => state.dashboard
  )

  const cycleState =  useAppSelector((state) => state.cycle)

  useEffect(() => {
    if (farmer && farmerLandId) {
      dispatch(getSummaryDashboard({ farmer_land_id: farmerLandId }))
    }
  }, [farmer, searchParams])

  useEffect(() => {
    if (GET_SUMMARY_DASHBOARD_FULFILLED) {
      setIsLoading(false)
    }
  }, [type, status, summary_data])

  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
        <Loading show={isLoading} />
      ) : (
        <>
          <h2 className="text-2xl font-semibold mt-2">
            {farmer == null ? "Lahan Belum Dipilih" : `${farmer.farmerLand}`}
          </h2>
          <div className="flex  justify-between gap-4">
            <h3 className="text-xl font-semibold mt-2 capitalize">
              {farmer == null
                ? "Penggarap Belum Dipilih"
                : `${farmer.farmerName}`}
            </h3>
            <Formik
              initialValues={{
                cycle_id: {
                  _id: "",
                  name: "",
                },
              }}
              validationSchema={Yup.object().shape({
                cycle_id: Yup.mixed().required(),
              })}
              onSubmit={(
                values: {
                  cycle_id: {
                    _id: string
                    name: string
                  }
                },
                action: any
              ) => console.log(values)}
            >
              {(props: FormikProps<any>) => (
                <Form
                  onSubmit={props.handleSubmit}
                  className="flex flex-col bg-white rounded-[12px] w-1/4 h-full"
                >
                  <AutoCompleteSearchField
                    onFetchData={() => {
                      dispatch(getCycles())
                    }}
                    state={cycleState}
                    type={GET_ALL_CYCLE_FULFILLED}
                    formik={props}
                    name="cycle_id"
                    value={selectedCycle}
                    placeholder="Pilih siklus"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const cycle = {
                        _id: ifemptyData(event.target.value, ["_id"], ""),
                        name: ifemptyData(event.target.value, ["name"], ""),
                      }
                      setSelectedCycle(cycle)
                      const cycleId = ifemptyData(
                        event.target.value,
                        ["_id"],
                        null
                      )
                      if (cycleId && farmerLandId) {
                        setIsLoading(true)
                        dispatch(
                          getSummaryDashboard({
                            farmer_land_id: farmerLandId,
                            cycle_id: cycleId,
                          })
                        )
                      }
                    }}
                    disabled={props.isSubmitting}
                    error={props.touched.cycle_id && props.errors.cycle_id}
                    errorText={props.errors.cycle_id}
                  />
                </Form>
              )}
            </Formik>
          </div>

          <div
            onClick={() => {
              dispatch({ type: RESET_STATE })
              router.push("/")
            }}
            className="w-fit flex items-center gap-2 text-lg mt-2 text-tand-1 cursor-pointer"
          >
            <ChevronDoubleLeftIcon className="w-5 h-5 text-tand-2" />
            Kembali Pilih Petani
          </div>
          <HarvestLineChart harvest_data={summary_data?.chart_harvests ?? []} />
          <IncomeLineChart income_data={summary_data?.chart_incomes ?? []} />
          <OutcomeLineChart
            outcome_data={summary_data?.chart_operation_costs ?? []}
          />
        </>
      )}
    </div>
  )
}
