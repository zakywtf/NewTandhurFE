"use client"

import { useFormik } from "formik"
import Image from "next/image"
import * as Yup from "yup"
import Button from "../ui/fields/Button"
import TextField from "../ui/fields/TextField"
import PhoneField from "../ui/fields/PhoneField"
import PasswordField from "../ui/fields/PasswordField"
import { useRouter } from "next/navigation"
import { useState } from "react"

Yup.addMethod(
  Yup.mixed,
  "isValidPhoneNumber",
  function isValidPhoneNumber(message) {
    return this.test({
      name: "isValidPhoneNumber",
      message: message,
      test: function (this, value) {
        const { path, createError } = this
        if (value && value.toString().length > 0) {
          var reg = /^\d+$/
          if (reg.test(value.toString())) {
            if (
              value.toString().substring(0, 2) != "08" &&
              value.toString().substring(0, 1) != "8"
            ) {
              return createError({
                path,
                message: "Nomor HP tidak sesuai, harus berawalan 08 atau 8",
              })
            } else if (value.toString().length < 8) {
              return createError({
                path,
                message: "Nomor HP tidak sesuai, minimal 8 digit angka",
              })
            }
            return true
          } else {
            return createError({
              path,
              message: "Nomor HP tidak sesuai, minimal 8 digit angka",
            })
          }
        } else {
          return true
        }
      },
    })
  }
)

const DisplayingErrorMessagesSchema = Yup.object().shape({
  nik: Yup.string()
    .min(16, "Nomor tidak sesuai, minimal 16 digit angka")
    .max(16, "Nomor tidak sesuai, maksimal 16 digit angka")
    .required("Mohon isi terlebih dahulu"),
  name: Yup.string()
    .min(2, "Tulis minimal 2 digit huruf")
    .matches(/^[aA-zZ\s]+$/, "Tulis minimal 2 digit huruf")
    .required("Mohon isi terlebih dahulu"),
  phone: Yup.string()
    // .isValidPhoneNumber()
    .required("Mohon isi terlebih dahulu"),
  username: Yup.string()
    .min(2, "Tulis minimal 2 digit huruf")
    .matches(/^[aA-zZ\s]+$/, "Tulis minimal 2 digit huruf")
    .required("Mohon isi terlebih dahulu"),
  password: Yup.string()
    .required("Mohon isi terlebih dahulu")
    .min(8, "Kata sandi minimal 8 digit"),
  email: Yup.string()
    .required("Mohon isi terlebih dahulu")
    .email("Format email harus seperti email@mail.com"),
})

const handleRegisterAccount = async (body: any) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/register`

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (res.status == 200) {
    const data = await res.json()

    return {
      status: {
        success: true,
        message: data.message,
      },
    }
  }

  return {
    status: {
      success: false,
      message: "failed",
    },
  }
}

export default function Page() {
  const router = useRouter()
  const [error, setError] = useState<{ error: boolean; message: string }>({
    error: false,
    message: "success",
  })
  const formik = useFormik({
    initialValues: {
      name: "",
      nik: "",
      phone: "",
      email: "",
      password: "",
      username: "",
    },
    validationSchema: DisplayingErrorMessagesSchema,
    onSubmit: async function (values, actions) {
      const response = await handleRegisterAccount(values)
      if (response.status) {
        router.push("/login")
      } else {
        setError(response.status)
      }
      actions.resetForm()
    },
  })

  return (
    <div className="relative w-screen h-screen bg-cover bg-no-repeat overflow-y-hidden bg-[url('/bg_register.png')]">
      <div className="absolute left-0 top-0 w-screen h-screen bg-black/[0.4]" />
      <div className="absolute left-0 top-0 w-full sm:w-[464px] bg-white h-screen md:rounded-r-[12px] ">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col relative h-full"
        >
          <div className={`w-full px-10 py-4`}>
            <Image
              className="h-[52px] w-[156px]"
              alt="logo-tandhur"
              src="/Logo-tandhur.png"
              width={156}
              height={52}
            />
          </div>
          {error.error && (
            <span className="text-sm text-center font-semibold mt-6 text-red-500">
              {error.message}
            </span>
          )}
          <div className="px-10 py-4 grow flex flex-col h-full overflow-y-scroll no-scrollbar">
            <span className="text-2xl font-semibold mt-6 text-tand-appr-1">
              Bergabung dengan Tandhur
            </span>
            <span className="text-sm font-normal mt-1 text-tand-appr-2">
              Isi data di bawah ini untuk mendaftar
            </span>
            <div className={`flex flex-col`}>
              <div className="mt-7 flex flex-col">
                <TextField
                  name="name"
                  label="Nama Lengkap "
                  subLabel="(Sesuai KTP)"
                  type="letter"
                  styleSubLabel="text-sm font-medium text-[#909090]"
                  placeholder="Ketik nama lengkap di sini"
                  disabled={formik.isSubmitting}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  error={formik.touched.name && formik.errors.name}
                  errorText={formik.errors.name}
                />
              </div>
              <div className="mt-7 flex flex-col">
                <TextField
                  name="nik"
                  label="NIK"
                  subLabel="(Sesuai KTP)"
                  styleSubLabel="text-sm font-medium text-[#909090]"
                  placeholder="Ketik nik lengkap di sini"
                  disabled={formik.isSubmitting}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nik}
                  error={formik.touched.nik && formik.errors.nik}
                  errorText={formik.errors.nik}
                />
              </div>
              <div className="mt-7 flex flex-col">
                <PhoneField
                  name="phone"
                  label="Nomor HP"
                  type="number"
                  placeholder="Ketik nomor hp di sini"
                  disabled={formik.isSubmitting}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  error={formik.touched.phone && formik.errors.phone}
                  errorText={formik.errors.phone}
                />
              </div>
              <div className="mt-7 flex flex-col">
                <TextField
                  name="email"
                  label="Email"
                  styleSubLabel="text-sm font-medium text-[#909090]"
                  placeholder="Ketik email di sini"
                  disabled={formik.isSubmitting}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={formik.touched.email && formik.errors.email}
                  errorText={formik.errors.email}
                />
              </div>
              <div className="mt-7 flex flex-col">
                <TextField
                  name="username"
                  label="Username"
                  styleSubLabel="text-sm font-medium text-[#909090]"
                  placeholder="Ketik username di sini"
                  disabled={formik.isSubmitting}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  error={formik.touched.username && formik.errors.username}
                  errorText={formik.errors.username}
                />
              </div>
              <div className="mt-7 flex flex-col">
                <PasswordField
                  name="password"
                  label="Kata Sandi"
                  placeholder="Ketik kata sandi di sini"
                  disabled={formik.isSubmitting}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  error={formik.touched.password && formik.errors.password}
                  errorText={formik.errors.password}
                />
              </div>
              <Button
                buttonType="primary"
                label="Masuk"
                disabled={!formik.isValid || !formik.dirty}
                className="mt-6"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
