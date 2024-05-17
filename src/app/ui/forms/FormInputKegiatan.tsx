"use client"

import { FormActivity, FormActivityData } from "@/interfaces/FormActivity"
import { Form, Formik, FormikProps } from "formik"
import React, { useState } from "react"
import * as Yup from "yup"
import Button from "../fields/Button"
import DatePickerField from "../fields/DatePickerField"
import DropdownField from "../fields/DropdownField"
import TextField from "../fields/TextField"

const FormInputKegiatan: React.FC<FormActivity> = ({
  type = "create",
  types,
  initialValues,
  onSubmit,
  onCloseModal,
}) => {
  const [currentTab, setCurrentTab] = useState(1)
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    brand: Yup.string().min(2, "Tulis minimal 2 digit huruf").nullable(),
    treatment: Yup.number()
      .min(1, "Minimal 1 Digit").nullable(),
    activity_date: Yup.date().required("Mohon isi terlebih dahulu"),
    operating_costs: Yup.number()
      .min(100, "Minimal 3 Digit")
      .required("Mohon isi terlebih dahulu"),
    amount: Yup.number()
      .min(1, "Minimal 1 Digit").nullable(),
    unit: Yup.mixed().nullable()
  })

  function handleSubmit(values: FormActivityData, action: any) {
    onSubmit(values, action)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<FormActivityData>) => (
        <Form
          onSubmit={props.handleSubmit}
          className="flex flex-col bg-white rounded-[12px] w-full h-full "
        >
          <div className="flex flex-col grow mt-8 mx-8 overflow-y-scroll no-scrollbar">
            <span className="text-2xl font-semibold text-tand-appr-1 ">
              {type === "create"
                ? "Tambah Kegiatan Baru"
                : "Ubah Data Kegiatan"}
            </span>
            {currentTab == 1 && (
              <div className="mt-3 w-full flex flex-wrap gap-2 text-sm">
                {types.map((type) => {
                  return (
                    <div
                      key={crypto.randomUUID()}
                      onClick={() =>
                        props.setFieldValue("type_activity", {
                          id: type._id,
                          name: type.name,
                        })
                      }
                      className={`p-4 w-[23%] border-2 border-tand-2 text-sm font-bold text-center rounded cursor-pointer ${
                        props.values.type_activity != null &&
                        props.values.type_activity.name == type.name &&
                        "bg-tand-12"
                      }`}
                    >
                      {type.name}
                    </div>
                  )
                })}
              </div>
            )}
            {currentTab == 2 && (
              <div className="flex flex-row mt-8 gap-x-6">
                <div className="w-1/2 flex flex-col gap-y-3.5">
                  <DatePickerField
                    name="activity_date"
                    label="Tanggal Kegiatan"
                    showPast={true}
                    showFuture={false}
                    placeholder="Pilih Tanngal"
                    value={props.values.activity_date}
                    onChange={props.handleChange}
                    disabled={props.isSubmitting}
                    error={
                      props.touched.activity_date && props.errors.activity_date
                    }
                    errorText={props.errors.activity_date}
                  />

                  <TextField
                    name="treatment"
                    label="Perlakuan Ke"
                    subLabel="(Tidak Wajib)"
                    type="number"
                    placeholder="Contoh: 1"
                    disabled={props.isSubmitting}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.treatment ?? ""}
                    error={props.touched.treatment && props.errors.treatment}
                    errorText={props.errors.treatment}
                  />
                  <div className="flex flex-row items-end gap-x-1.5">
                    <div className="w-3/5">
                      <TextField
                        name="amount"
                        label="Jumlah/Kuantitas"
                        subLabel="(Tidak Wajib)"
                        type="number"
                        placeholder="Isi jumlah/kuantitas"
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
                          { id: "liter", name: "Liter" },
                          { id: "bibit", name: "Bibit" },
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
                <div className="w-1/2 flex flex-col gap-y-3.5">
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
                  <TextField
                    name="brand"
                    label="Jenis/Merk"
                    subLabel="(Tidak Wajib)"
                    placeholder="Contoh: Merk A"
                    disabled={props.isSubmitting}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.brand}
                    error={props.touched.brand && props.errors.brand}
                    errorText={props.errors.brand}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="w-full flex flex-row gap-x-6 pt-4 mt-4 pb-6 px-10 bg-white shadow-main-1 rounded-br-[12px] rounded-bl-[12px]">
            {currentTab == 1 && (
              <>
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
                  label="Lanjutkan"
                  disabled={
                    !props.dirty || (props.errors.type_activity ? true : false)
                  }
                  onClick={() => setCurrentTab(2)}
                />
              </>
            )}
            {currentTab == 2 && (
              <>
                <Button
                  buttonType="secondary"
                  label="Kembali"
                  onClick={() => setCurrentTab(1)}
                />
                <Button
                  buttonType="primary"
                  label="Konfirmasi"
                  type="submit"
                  disabled={
                    !props.isValid || (!props.dirty && type === "create")
                  }
                />
              </>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default FormInputKegiatan
