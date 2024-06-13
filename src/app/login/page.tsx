"use client"

import { useFormik } from "formik"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import * as Yup from "yup"
import Button from "../ui/fields/Button"
import EmailNomorHPField from "../ui/fields/EmailNoHPField"
import PasswordField from "../ui/fields/PasswordField"
import Loading from "../ui/loading"

Yup.addMethod(
  Yup.mixed,
  "isValidEmailOrNumber",
  function isValidEmailOrNumber(message) {
    return this.test({
      exclusive: true,
      name: "isValidEmailOrNumber",
      message: message,
      test: function (this, value) {
        let input = String(value)
        const { path, createError } = this
        if (input && input.length > 0) {
          var reg = /^\d+$/
          if (reg.test(input)) {
            if (input.substring(0, 2) != "08" && input.substring(0, 1) != "8") {
              return createError({
                path,
                message: "Nomor HP tidak sesuai, harus berawalan 08 atau 8",
              })
            } else if (input.length < 8) {
              return createError({
                path,
                message: "Nomor HP tidak sesuai, minimal 8 digit angka",
              })
            }
            return true
          } else {
            if (
              input.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )
            ) {
              return true
            } else {
              return createError({
                path,
                message: "Format email harus seperti email@mail.com",
              })
            }
          }
        } else {
          return true
        }
      },
    })
  }
)

const DisplayingErrorMessagesSchema = Yup.object().shape({
  email_no_hp: Yup.string()
    // .isValidEmailOrNumber()
    .required("Mohon isi terlebih dahulu"),
  password: Yup.string()
    .min(8, "Kata sandi minimal 8 digit")
    .required("Mohon isi terlebih dahulu"),
})

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email_no_hp: "",
      password: "",
    },
    validationSchema: DisplayingErrorMessagesSchema,
    onSubmit: async function (values, actions) {
      setIsLoading(true)
      await signIn("credentials", {
        username: values.email_no_hp,
        password: values.password,
        callbackUrl: "/",
      })
      actions.resetForm()
    },
    validateOnBlur: false,
  })
  
  return (
    <main className="relative w-screen h-screen bg-cover bg-no-repeat bg-[url('/bg_login.png')]">
      <div className="absolute left-0 top-0 w-screen h-screen bg-black/[0.4]" />
      <Loading show={isLoading} />
      <div className="absolute left-0 top-0 md:w-[464px] bg-white h-screen md:rounded-r-[12px] p-10 ">
        <form onSubmit={formik.handleSubmit} className="flex flex-col">
          <Image
            className="h-[52px] w-[156px]"
            alt="logo-tandhur"
            src="/Logo-tandhur.png"
            width={156}
            height={52}
          />

          <span className="text-2xl font-semibold mt-10 text-tand-appr-1">
            Selamat datang di Tandhur!
          </span>
          <span className="text-sm font-normal mt-1 text-tand-appr-2">
            Masuk untuk melanjutkan
          </span>

          <div className="mt-7 flex flex-col">
            <EmailNomorHPField
              name="email_no_hp"
              label="Username"
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email_no_hp}
              error={formik.touched.email_no_hp && formik.errors.email_no_hp}
              errorText={formik.errors.email_no_hp}
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

          <div className="mt-4 flex flex-row justify-between">
            <div className="flex items-center gap-x-2">
              <input
                id="ingat_saya"
                name="ingat_saya"
                type="checkbox"
                className="ring-2 h-4 w-4 accent-tand-2 border-0 rounded-md focus:ring-0"
              />
              <label
                htmlFor="ingat_saya"
                className="font-medium text-sm text-tand-appr-1"
              >
                Ingat Saya
              </label>
            </div>
            <Link
              href="/lupa_kata_sandi"
              className="text-sm font-semibold text-tand-2 cursor-pointer"
            >
              Lupa Kata Sandi
            </Link>
          </div>

          <div className="mt-6 flex flex-row justify-center">
            <span className="text-sm font-medium text-tand-appr-4 mr-1">
              Belum punya akun?{" "}
            </span>
            <Link
              href="/register"
              className="text-sm font-semibold text-tand-2 cursor-pointer"
            >
              Daftar sekarang
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}
