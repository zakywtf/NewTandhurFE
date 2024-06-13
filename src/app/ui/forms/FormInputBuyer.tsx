"use client"

import {
  GET_MASTER_DESA_FULFILLED,
  GET_MASTER_KABUPATEN_FULFILLED,
  GET_MASTER_KECAMATAN_FULFILLED,
  GET_MASTER_PROVINSI_FULFILLED,
} from "@/helpers/const"
import {
  getMasterDesa,
  getMasterKabupaten,
  getMasterKecamatan,
  getMasterProvinsi,
} from "@/helpers/helper"
import { FormBuyer, FormBuyerData } from "@/interfaces/FormBuyer"
import { FormFarmerData } from "@/interfaces/FormFarmer"
import { Form, Formik, FormikProps } from "formik"
import React from "react"
import * as Yup from "yup"
import DynamicAutoCompleteField from "../autocompletes/DynamicAutoCompleteField"
import Button from "../fields/Button"
import PhoneField from "../fields/PhoneField"
import TextField from "../fields/TextField"

const FormInputBuyer: React.FC<FormBuyer> = ({
  initialValues,
  onSubmit,
  onCloseModal,
}) => {
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    agency: Yup.string()
      .min(2, "Minimal 3 Digit")
      .required("Mohon isi terlebih dahulu"),
    name: Yup.string()
      .min(2, "Minimal 2 Digit")
      .required("Mohon isi terlebih dahulu"),
    phone: Yup.string()
      .min(10, "Minimal 10 Digit")
      .max(12, "Maksimal 12 Digit")
      .required("Mohon isi terlebih dahulu"),
    province: Yup.mixed().required("Mohon isi terlebih dahulu"),
    regencies: Yup.mixed().required("Mohon isi terlebih dahulu"),
    district: Yup.mixed().required("Mohon isi terlebih dahulu"),
    village: Yup.mixed().required("Mohon isi terlebih dahulu"),
  })

  function handleSubmit(values: FormBuyerData, action: any) {
    onSubmit(values, action)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<FormBuyerData>) => (
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
                  name="agency"
                  label="Nama Instansi Pembeli"
                  placeholder="Contoh: PT. XYZ"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.agency ?? ""}
                  error={props.touched.agency && props.errors.agency}
                  errorText={props.errors.agency}
                />
                <TextField
                  name="name"
                  label="Nama Pembeli"
                  placeholder="Contoh: Budi"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name ?? ""}
                  error={props.touched.name && props.errors.name}
                  errorText={props.errors.name}
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
                <DynamicAutoCompleteField
                  masterDispatch={getMasterProvinsi}
                  typeMaster={GET_MASTER_PROVINSI_FULFILLED}
                  formik={props}
                  name="province"
                  value={initialValues.province}
                  label="Provinsi"
                  placeholder="Pilih atau ketik nama provinsi"
                  onChange={props.handleChange}
                  disabled={props.isSubmitting}
                  error={props.touched.province && props.errors.province}
                  errorText={props.errors.regencies}
                />
                <DynamicAutoCompleteField
                  parentId={
                    props.values.province && props.values.province.id
                      ? props.values.province.id
                      : ""
                  }
                  masterDispatch={getMasterKabupaten}
                  typeMaster={GET_MASTER_KABUPATEN_FULFILLED}
                  formik={props}
                  name="regencies"
                  value={initialValues.regencies}
                  label="Kabupaten atau Kota"
                  placeholder="Pilih atau ketik nama kabupaten"
                  onChange={props.handleChange}
                  disabled={props.isSubmitting || !props.values.province}
                  error={props.touched.regencies && props.errors.regencies}
                  errorText={props.errors.regencies}
                />
                <DynamicAutoCompleteField
                  parentId={
                    props.values.regencies && props.values.regencies.id
                      ? props.values.regencies.id
                      : ""
                  }
                  masterDispatch={getMasterKecamatan}
                  typeMaster={GET_MASTER_KECAMATAN_FULFILLED}
                  formik={props}
                  value={initialValues.district}
                  name="district"
                  label="Kecamatan"
                  placeholder="Pilih atau ketik nama kecamatan"
                  onChange={props.handleChange}
                  disabled={props.isSubmitting || !props.values.regencies}
                  error={props.touched.district && props.errors.district}
                  errorText={props.errors.district}
                />

                <DynamicAutoCompleteField
                  parentId={
                    props.values.district && props.values.district.id
                      ? props.values.district.id
                      : ""
                  }
                  masterDispatch={getMasterDesa}
                  typeMaster={GET_MASTER_DESA_FULFILLED}
                  formik={props}
                  name="village"
                  value={initialValues.village}
                  label="Desa"
                  placeholder="Pilih atau ketik nama desa"
                  onChange={props.handleChange}
                  disabled={props.isSubmitting || !props.values.district}
                  error={props.touched.village && props.errors.village}
                  errorText={props.errors.village}
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

export default FormInputBuyer
