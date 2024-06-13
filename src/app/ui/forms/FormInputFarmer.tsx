"use client"

import { FormFarmer, FormFarmerData } from "@/interfaces/FormFarmer"
import { Form, Formik, FormikProps } from "formik"
import React from "react"
import * as Yup from "yup"
import Button from "../fields/Button"
import DatePickerField from "../fields/DatePickerField"
import DropdownField from "../fields/DropdownField"
import PhoneField from "../fields/PhoneField"
import TextField from "../fields/TextField"
import moment from "moment"

const FormInputFarmer: React.FC<FormFarmer> = ({
  initialValues,
  onSubmit,
  onCloseModal,
}) => {
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    nik: Yup.string()
      .min(16, "Minimal 16 Digit")
      .max(16, "Maksimal 16 Digit")
      .required("Mohon isi terlebih dahulu"),
    name: Yup.string()
      .min(2, "Minimal 2 Digit")
      .required("Mohon isi terlebih dahulu"),
    address: Yup.string().required("Mohon isi terlebih dahulu"),
    phone: Yup.string()
      .min(10, "Minimal 10 Digit")
      .max(12, "Maksimal 12 Digit")
      .required("Mohon isi terlebih dahulu"),
    gender: Yup.mixed().required("Mohon isi terlebih dahulu"),
    date_of_birth: Yup.date().required("Mohon isi terlebih dahulu"),
    age: Yup.number()
      .min(1, "Minimal 1 Tahun")
      .required("Mohon isi terlebih dahulu"),
  })

  function handleSubmit(values: FormFarmerData, action: any) {
    onSubmit(values, action)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<FormFarmerData>) => (
        <Form
          onSubmit={props.handleSubmit}
          className="flex flex-col bg-white rounded-[12px] w-full h-full "
        >
          <div className="flex flex-col grow mt-8 mx-8 overflow-y-scroll no-scrollbar">
            <span className="text-2xl font-semibold text-tand-appr-1 ">
              Tambah Penggarap
            </span>
            <div className="flex flex-row mt-8 gap-x-6">
              <div className="w-1/2 flex flex-col gap-y-3.5">
                <TextField
                  name="name"
                  label="Nama Penggarap (Sesuai KTP)"
                  placeholder="Contoh: Budi"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name ?? ""}
                  error={props.touched.name && props.errors.name}
                  errorText={props.errors.name}
                />
                <TextField
                  name="nik"
                  label="NIK (Sesuai KTP)"
                  placeholder="Contoh: 1234"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.nik ?? ""}
                  error={props.touched.nik && props.errors.nik}
                  errorText={props.errors.nik}
                />
                <TextField
                  name="address"
                  label="Alamat Domisi"
                  placeholder="Contoh: Yogyakarta"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.address ?? ""}
                  error={props.touched.address && props.errors.address}
                  errorText={props.errors.address}
                />
                <PhoneField
                  name="phone"
                  label="No. HP Penggarap"
                  placeholder="Contoh: 08211232"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.phone ?? ""}
                  error={props.touched.phone && props.errors.phone}
                  errorText={props.errors.phone}
                />
              </div>
              <div className="w-1/2 flex flex-col gap-y-3.5">
                <DropdownField
                  onChange={props.handleChange}
                  listItem={[
                    { id: "Pria", name: "Pria" },
                    { id: "Wanita", name: "Wanita" },
                  ]}
                  formik={props}
                  label="Jenis Kelamin"
                  name="gender"
                  disabled={props.isSubmitting}
                  error={props.errors.gender?.id}
                  errorText={props.errors.gender?.id}
                />
                <DatePickerField
                  name="date_of_birth"
                  label="Tanggal Lahir"
                  showPast={true}
                  showFuture={false}
                  placeholder="Pilih Tanngal"
                  value={props.values.date_of_birth}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const currentDate = moment()
                    const birthDate = moment(e.target.value)
                    const age = currentDate.year() - birthDate.year()
                    props.setFieldValue("age", age)
                    props.setFieldValue("date_of_birth", e.target.value)
                  }}
                  disabled={props.isSubmitting}
                  error={
                    props.touched.date_of_birth && props.errors.date_of_birth
                  }
                  errorText={props.errors.date_of_birth}
                />
                <TextField
                  name="age"
                  label="Umur"
                  placeholder="Contoh: 20"
                  disabled={true}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.age.toString() ?? ""}
                  error={props.touched.age && props.errors.age}
                  errorText={props.errors.age}
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
              disabled={!props.isValid || !props.dirty}
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default FormInputFarmer
