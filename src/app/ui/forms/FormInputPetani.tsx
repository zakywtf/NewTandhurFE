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
import { FormPetani, FormPetaniData } from "@/interfaces/FormPetani"
import { Form, Formik, FormikProps } from "formik"
import React from "react"
import * as Yup from "yup"
import DynamicAutoCompleteField from "../autocompletes/DynamicAutoCompleteField"
import Button from "../fields/Button"
import EmailNomorHPField from "../fields/EmailNoHPField"
import TextField from "../fields/TextField"

const FormInputPetani: React.FC<FormPetani> = ({
  type = "create",
  initialValues,
  onSubmit,
  onCloseModal,
}) => {
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Tulis minimal 2 digit huruf")
      .required("Mohon isi terlebih dahulu"),
    blok_name: Yup.string().min(1, "Minimal 1 Huruf").nullable(),
    large: Yup.number()
      .min(1, "Minimal 1")
      .required("Mohon isi terlebih dahulu"),
    nik: Yup.string()
      .min(16, "Minimal 16 Digit")
      .max(16, "Maksimal 16 Digit")
      .nullable(),
    email: Yup.string().nullable(),
    phone: Yup.string().nullable(),
    province: Yup.mixed().required("Mohon isi terlebih dahulu"),
    regencies: Yup.mixed().required("Mohon isi terlebih dahulu"),
    district: Yup.mixed().required("Mohon isi terlebih dahulu"),
    village: Yup.mixed().required("Mohon isi terlebih dahulu"),
    longitude: Yup.string()
      .matches(
        /^(\+|-)?(?:180(?:\.0{1,12})?|(?:[0-9]{1,2}|1[0-7][0-9])(?:\.[0-9]{1,12})?)$/,
        "Format salah"
      )
      .required("Mohon isi terlebih dahulu"),
    latitude: Yup.string()
      .matches(
        /^(\+|-)?(?:180(?:\.0{1,12})?|(?:[0-9]{1,2}|1[0-7][0-9])(?:\.[0-9]{1,12})?)$/,
        "Format salah"
      )
      .required("Mohon isi terlebih dahulu"),
  })

  function handleSubmit(values: FormPetaniData, action: any) {
    onSubmit(values, action)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<FormPetaniData>) => (
        <Form
          onSubmit={props.handleSubmit}
          className="flex flex-col bg-white rounded-[12px] w-full h-full "
        >
          <div className="flex flex-col grow mt-8 mx-8 overflow-y-scroll no-scrollbar">
            <span className="text-2xl font-semibold text-tand-appr-1 ">
              {type === "create" ? "Tambah Lahan baru" : "Ubah data lahan"}
            </span>
            <div className="flex flex-row mt-8 gap-x-6">
              <div className="w-1/2 flex flex-col gap-y-3.5">
                <TextField
                  name="name"
                  label="Nama Petani"
                  placeholder="Contoh: Budi"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name}
                  error={props.touched.name && props.errors.name}
                  errorText={props.errors.name}
                />

                <TextField
                  name="blok_name"
                  label="Nama Blok (Tidak Wajib)"
                  placeholder="Contoh: Blok A"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.blok_name}
                  error={props.touched.blok_name && props.errors.blok_name}
                  errorText={props.errors.blok_name}
                />

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
              </div>
              <div className="w-1/2 flex flex-col gap-y-3.5">
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
                  //   onSelect={(val) => {
                  //     if (val && val.latitude && val.longitude) {
                  //       setCurrentPosition([val.latitude, val.longitude])
                  //     }
                  //   }}
                  placeholder="Pilih atau ketik nama desa"
                  onChange={props.handleChange}
                  disabled={props.isSubmitting || !props.values.district}
                  error={props.touched.village && props.errors.village}
                  errorText={props.errors.village}
                />
                <TextField
                  name="latitude"
                  label="Latitude"
                  placeholder="-7.74223636954"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.latitude.toString()}
                  error={props.touched.latitude && props.errors.latitude}
                  errorText={props.errors.latitude}
                />

                <TextField
                  name="longitude"
                  label="Longitude"
                  placeholder="110.482076919"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.longitude.toString()}
                  error={props.touched.longitude && props.errors.longitude}
                  errorText={props.errors.longitude}
                />
                <TextField
                  name="large"
                  label="Luas Lahan"
                  type="number"
                  placeholder="Ketik luas lahan di sini"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.large.toString()}
                  error={props.touched.large && props.errors.large}
                  errorText={props.errors.large}
                />

                <TextField
                  name="nik"
                  label="NIK/No. KTP"
                  placeholder="Ketik nik atau no. ktp di sini"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.nik}
                  error={props.touched.nik && props.errors.nik}
                  errorText={props.errors.nik}
                />

                <EmailNomorHPField
                  name="email"
                  label="Email (Tidak Wajib)"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.email}
                  error={props.touched.email && props.errors.email}
                  errorText={props.errors.email}
                />

                <EmailNomorHPField
                  name="phone"
                  label="No. HP (Tidak Wajib)"
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.phone}
                  error={props.touched.phone && props.errors.phone}
                  errorText={props.errors.phone}
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

export default FormInputPetani
