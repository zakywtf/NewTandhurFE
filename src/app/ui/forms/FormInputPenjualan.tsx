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

const FormInputPenjualan: React.FC<FormPenjualan> = ({
  type = "create",
  initialValues,
  onSubmit,
  onCloseModal,
}) => {
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    distributor: Yup.string()
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
                  name="distributor"
                  label="Distributor"
                  placeholder="Contoh: Budi"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.distributor}
                  error={props.touched.distributor && props.errors.distributor}
                  errorText={props.errors.distributor}
                />

                <div className="flex flex-row items-end gap-x-1.5">
                  <div className="w-3/5">
                    <TextField
                      name="amount"
                      label="Jumlah"
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
