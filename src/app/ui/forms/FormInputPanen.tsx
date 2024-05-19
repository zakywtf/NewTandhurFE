"use client"

import { FormPanen, FormPanenData } from "@/interfaces/FormPanen"
import { Form, Formik, FormikProps } from "formik"
import React from "react"
import * as Yup from "yup"
import Button from "../fields/Button"
import DatePickerField from "../fields/DatePickerField"
import DropdownField from "../fields/DropdownField"
import TextField from "../fields/TextField"

const FormInputPanen: React.FC<FormPanen> = ({
  type = "create",
  initialValues,
  onSubmit,
  onCloseModal,
}) => {
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Tulis minimal 2 digit huruf")
      .required("Mohon isi terlebih dahulu"),
    harvest_date: Yup.date().required("Mohon isi terlebih dahulu"),
    operating_costs: Yup.number()
      .min(100, "Minimal 3 Digit")
      .required("Mohon isi terlebih dahulu"),
    amount: Yup.number()
      .min(1, "Minimal 1 Digit")
      .required("Mohon isi terlebih dahulu"),
    unit: Yup.mixed()
      .required("Mohon isi terlebih dahulu")
      .required("Mohon isi terlebih dahulu"),
  })

  function handleSubmit(values: FormPanenData, action: any) {
    onSubmit(values, action)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<FormPanenData>) => (
        <Form
          onSubmit={props.handleSubmit}
          className="flex flex-col bg-white rounded-[12px] w-full h-full "
        >
          <div className="flex flex-col grow mt-8 mx-8 overflow-y-scroll no-scrollbar">
            <span className="text-2xl font-semibold text-tand-appr-1 ">
              {type === "create" ? "Tambah Panen Baru" : "Ubah Data Panen"}
            </span>
            <div className="flex flex-row mt-8 gap-x-6">
              <div className="w-1/2 flex flex-col gap-y-3.5">
                <TextField
                  name="name"
                  label="Nama Panen"
                  placeholder="Contoh: Panen 1"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name}
                  error={props.touched.name && props.errors.name}
                  errorText={props.errors.name}
                />

                <TextField
                  name="operating_costs"
                  label="Biaya Operasional"
                  styleSubLabel="text-sm font-medium text-tand-grey-2"
                  placeholder="Isi biaya operasional"
                  type="money"
                  preffixText="Rp"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.operating_costs.toString()}
                  error={
                    props.touched.operating_costs &&
                    props.errors.operating_costs
                  }
                  errorText={props.errors.operating_costs}
                />
              </div>
              <div className="w-1/2 flex flex-col gap-y-3.5">
                <DatePickerField
                  name="harvest_date"
                  label="Tanngal"
                  showPast={true}
                  showFuture={false}
                  placeholder="Pilih Tanngal"
                  value={props.values.harvest_date}
                  onChange={props.handleChange}
                  disabled={props.isSubmitting}
                  error={
                    props.touched.harvest_date && props.errors.harvest_date
                  }
                  errorText={props.errors.harvest_date}
                />

                <div className="flex flex-row items-end gap-x-1.5">
                  <div className="w-3/5">
                    <TextField
                      name="amount"
                      label="Hasil Panen"
                      type="number"
                      placeholder="Isi hasil panen"
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
              disabled={!props.isValid || !props.dirty && type === "create"}
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default FormInputPanen
