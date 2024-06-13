"use client"

import {
  GET_ALL_COMMODITY_FULFILLED,
  GET_ALL_FARMER_FULFILLED,
  GET_ALL_GUIDE_FULFILLED,
} from "@/helpers/const"
import { getCommodities } from "@/helpers/libs/features/actions/commodityAction"
import { getFarmers } from "@/helpers/libs/features/actions/farmerAction"
import { useAppDispatch, useAppSelector } from "@/helpers/libs/hooks"
import { FormSiklus, FormSiklusData } from "@/interfaces/FormSiklus"
import { Form, Formik, FormikProps } from "formik"
import React from "react"
import * as Yup from "yup"
import AutoCompleteSearchField from "../autocompletes/AutoCompleteSearchField"
import AutoCompleteWithButtonField from "../autocompletes/AutoCompleteWithButtonField"
import Button from "../fields/Button"
import DatePickerField from "../fields/DatePickerField"
import TextField from "../fields/TextField"
import { getGuide } from "@/helpers/libs/features/actions/guideAction"

const FormInputSiklus: React.FC<FormSiklus> = ({
  type = "create",
  initialValues,
  onSubmit,
  onCloseModal,
  onOpenFarmerModal,
}) => {
  const dispatch = useAppDispatch()
  const commodityState = useAppSelector((state) => state.commodity)
  const guideState = useAppSelector((state) => state.guide)
  const farmerState = useAppSelector((state) => state.farmer)
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string().required("Mohon isi terlebih dahulu"),
    commodity_id: Yup.mixed().required("Mohon isi terlebih dahulu"),
    farmer_id: Yup.mixed().required("Mohon isi terlebih dahulu"),
    cultivation_guide: Yup.mixed().required("Mohon isi terlebih dahulu"),
    start_date: Yup.date().required("Mohon isi terlebih dahulu"),
  })

  function handleSubmit(values: FormSiklusData, action: any) {
    onSubmit(values, action)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<FormSiklusData>) => (
        <Form
          onSubmit={props.handleSubmit}
          className="flex flex-col bg-white rounded-[12px] w-full h-full "
        >
          <div className="flex flex-col grow mt-8 mx-8 overflow-y-scroll no-scrollbar">
            <span className="text-2xl font-semibold text-tand-appr-1 ">
              {type === "create" ? "Tambah Siklus Baru" : "Ubah Data Siklus"}
            </span>

            <div className="flex flex-row mt-8 gap-x-6">
              <div className="w-1/2 flex flex-col gap-y-3.5">
                <TextField
                  name="name"
                  label="Nama Budidaya/Siklus"
                  placeholder="Contoh: Siklus 1"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name ?? ""}
                  error={props.touched.name && props.errors.name}
                  errorText={props.errors.name}
                />
                <AutoCompleteSearchField
                  onFetchData={() => {
                    dispatch(getCommodities())
                  }}
                  state={commodityState}
                  type={GET_ALL_COMMODITY_FULFILLED}
                  formik={props}
                  name="commodity_id"
                  value={props.values.commodity_id}
                  label="Komoditas"
                  placeholder="Pilih komoditas"
                  onChange={props.handleChange}
                  disabled={props.isSubmitting}
                  error={
                    props.touched.commodity_id && props.errors.commodity_id
                  }
                  errorText={props.errors.commodity_id}
                />
                <AutoCompleteWithButtonField
                  onFetchData={() => {
                    dispatch(getFarmers())
                  }}
                  state={farmerState}
                  type={GET_ALL_FARMER_FULFILLED}
                  formik={props}
                  name="farmer_id"
                  value={props.values.farmer_id}
                  label="Penggarap"
                  placeholder="Pilih penggarap"
                  onChange={props.handleChange}
                  disabled={props.isSubmitting}
                  error={props.touched.farmer_id && props.errors.farmer_id}
                  errorText={props.errors.farmer_id}
                >
                  <Button
                    buttonType="secondary"
                    label="Tambah Penggarap"
                    disabled={false}
                    className="flex-col w-full px-4"
                    width="auto"
                    onClick={onOpenFarmerModal}
                  />
                </AutoCompleteWithButtonField>
              </div>
              <div className="w-1/2 flex flex-col gap-y-3.5">
                <DatePickerField
                  name="start_date"
                  label="Tanggal Mulai"
                  showPast={true}
                  showFuture={false}
                  placeholder="Pilih Tanngal"
                  value={props.values.start_date}
                  onChange={props.handleChange}
                  disabled={props.isSubmitting}
                  error={props.touched.start_date && props.errors.start_date}
                  errorText={props.errors.start_date}
                />
                <AutoCompleteSearchField
                  onFetchData={() => {
                    if (props.values.commodity_id._id != '') {
                      dispatch(getGuide(props.values.commodity_id._id))
                    }
                    return
                  }}
                  state={guideState}
                  type={GET_ALL_GUIDE_FULFILLED}
                  formik={props}
                  name="cultivation_guide"
                  value={props.values.cultivation_guide}
                  label="Panduan"
                  placeholder="Pilih panduan"
                  onChange={props.handleChange}
                  disabled={props.isSubmitting || props.values.commodity_id._id == ''}
                  error={
                    props.touched.cultivation_guide && props.errors.cultivation_guide
                  }
                  errorText={props.errors.cultivation_guide}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row gap-x-6 pt-4 mt-4 pb-6 px-10 bg-white shadow-main-1 rounded-br-[12px] rounded-bl-[12px]">
            <Button
              buttonType="secondary"
              label="Kembali"
              onClick={() => {
                props.resetForm()
                onCloseModal(false)
              }}
            />
            <Button
              buttonType="primary"
              label="Konfirmasi"
              type="submit"
              disabled={!props.isValid || (!props.dirty && type === "create")}
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default FormInputSiklus
