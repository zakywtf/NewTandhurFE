"use client"

import { FormPanen, FormPanenData } from "@/interfaces/FormPanen"
import { Form, Formik, FormikProps } from "formik"
import React from "react"
import * as Yup from "yup"
import Button from "../fields/Button"
import DatePickerField from "../fields/DatePickerField"
import DropdownField from "../fields/DropdownField"
import TextField from "../fields/TextField"
import { FormPenjualan, FormPenjualanData } from "@/interfaces/FormPenjualan"
import UploadField from "../fields/UploadFile"
import AutoCompleteSearchField from "../autocompletes/AutoCompleteSearchField"
import { getCommodities } from "@/helpers/libs/features/actions/commodityAction"
import { useAppDispatch, useAppSelector } from "@/helpers/libs/hooks"
import {
  GET_ALL_BUYER_FULFILLED,
  GET_ALL_COMMODITY_FULFILLED,
  GET_ALL_CYCLE_FULFILLED,
} from "@/helpers/const"
import { getCycles } from "@/helpers/libs/features/actions/cycleAction"
import AutoCompleteWithButtonField from "../autocompletes/AutoCompleteWithButtonField"
import { getBuyers } from "@/helpers/libs/features/actions/buyerAction"

const FormInputPenjualan: React.FC<FormPenjualan> = ({
  type = "create",
  initialValues,
  onSubmit,
  onCloseModal,
  onOpenBuyerModal
}) => {
  const dispatch = useAppDispatch()
  const buyerState = useAppSelector((state) => state.buyer)
  const commodityState = useAppSelector((state) => state.commodity)
  const cycleState = useAppSelector((state) => state.cycle)
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Tulis minimal 2 digit huruf")
      .required("Mohon isi terlebih dahulu"),
    selling_date: Yup.date().required("Mohon isi terlebih dahulu"),
    price: Yup.number()
      .min(100, "Minimal 3 Digit")
      .required("Mohon isi terlebih dahulu"),
    amount: Yup.number()
      .min(1, "Minimal 1 Digit")
      .required("Mohon isi terlebih dahulu"),
    unit: Yup.mixed()
      .required("Mohon isi terlebih dahulu")
      .required("Mohon isi terlebih dahulu"),
    proof_payment: Yup.mixed().required("Mohon isi terlebih dahulu"),
    commodity_id: Yup.mixed().required("Mohon isi terlebih dahulu"),
    buyer_id: Yup.mixed().required("Mohon isi terlebih dahulu"),
    cycle_id: Yup.mixed().required("Mohon isi terlebih dahulu"),
  })

  function handleSubmit(values: FormPenjualanData, action: any) {
    onSubmit(values, action)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<FormPenjualanData>) => (
        <Form
          onSubmit={props.handleSubmit}
          className="flex flex-col bg-white rounded-[12px] w-full h-full "
        >
          <div className="flex flex-col grow mt-8 mx-8 overflow-y-scroll no-scrollbar">
            <span className="text-2xl font-semibold text-tand-appr-1 ">
              {type === "create"
                ? "Tambah Penjualan Baru"
                : "Ubah Data Penjualan"}
            </span>
            <div className="flex flex-row mt-8 gap-x-6">
              <div className="w-1/2 flex flex-col gap-y-3.5">
                <TextField
                  name="name"
                  label="Nama Penjualan"
                  placeholder="Contoh: Penjualan 1"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name}
                  error={props.touched.name && props.errors.name}
                  errorText={props.errors.name}
                />

                <AutoCompleteWithButtonField
                  onFetchData={() => {
                    dispatch(getBuyers())
                  }}
                  state={buyerState}
                  type={GET_ALL_BUYER_FULFILLED}
                  formik={props}
                  name="buyer_id"
                  value={props.values.buyer_id}
                  label="Pembeli"
                  placeholder="Pilih pembeli"
                  onChange={props.handleChange}
                  disabled={props.isSubmitting}
                  error={props.touched.buyer_id && props.errors.buyer_id}
                  errorText={props.errors.buyer_id}
                >
                  <Button
                    buttonType="secondary"
                    label="Tambah Pembeli"
                    disabled={false}
                    className="flex-col w-full px-4"
                    width="auto"
                    onClick={onOpenBuyerModal}
                  />
                </AutoCompleteWithButtonField>

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
                  errorText={props.errors.cycle_id}
                />

                <TextField
                  name="price"
                  label="Harga Total"
                  styleSubLabel="text-sm font-medium text-tand-grey-2"
                  placeholder="Isi harga total"
                  type="money"
                  preffixText="Rp"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.price.toString()}
                  error={props.touched.price && props.errors.price}
                  errorText={props.errors.price}
                />
              </div>
              <div className="w-1/2 flex flex-col gap-y-3.5">
                <DatePickerField
                  name="selling_date"
                  label="Tanggal Penjualan"
                  showPast={true}
                  showFuture={false}
                  placeholder="Pilih Tanggal"
                  value={props.values.selling_date}
                  onChange={props.handleChange}
                  disabled={props.isSubmitting}
                  error={
                    props.touched.selling_date && props.errors.selling_date
                  }
                  errorText={props.errors.selling_date}
                />

                <AutoCompleteSearchField
                  onFetchData={() => {
                    dispatch(getCycles())
                  }}
                  state={cycleState}
                  type={GET_ALL_CYCLE_FULFILLED}
                  formik={props}
                  name="cycle_id"
                  value={props.values.cycle_id}
                  label="Nama Siklus"
                  placeholder="Pilih siklus"
                  onChange={props.handleChange}
                  disabled={props.isSubmitting}
                  error={
                    props.touched.cycle_id && props.errors.cycle_id
                  }
                  errorText={props.errors.cycle_id}
                />

                <div className="flex flex-row items-end gap-x-1.5">
                  <div className="w-3/5">
                    <TextField
                      name="amount"
                      label="Kuantitas"
                      type="number"
                      placeholder="Isi jumlah"
                      disabled={props.isSubmitting}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.amount.toString()}
                      error={props.touched.amount && props.errors.amount}
                      errorText={props.errors.amount}
                    />
                  </div>

                  <div className="w-2/5">
                    <DropdownField
                      onChange={() => null}
                      listItem={[
                        { id: "kg", name: "Kg" },
                        { id: "ton", name: "Ton" },
                      ]}
                      formik={props}
                      name="unit"
                      disabled={props.isSubmitting}
                      error={props.touched.unit && props.errors.unit}
                      errorText={props.errors.unit}
                    />
                  </div>
                </div>
                <UploadField
                  name="proof_payment"
                  label="Bukti Bayar"
                  formik={props}
                  value={props.values.proof_payment}
                  onChange={props.handleChange}
                  disabled={props.isSubmitting}
                  error={
                    props.touched.proof_payment && props.errors.proof_payment
                  }
                  errorText={props.errors.proof_payment}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-row gap-x-6 pt-4 mt-4 pb-6 px-10 bg-white shadow-main-1 rounded-br-[12px] rounded-bl-[12px]">
            <Button
              buttonType="secondary"
              label="Tutup halaman"
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

export default FormInputPenjualan
