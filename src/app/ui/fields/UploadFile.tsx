import { FormikValues } from "formik"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import Button from "./Button"

export default function UploadField({
  onChange,
  formik,
  value,
  name,
  disabled = false,
  label,
  styleLabel = "text-sm font-medium text-tand-appr-1",
  subLabel,
  styleSubLabel = "text-sm font-medium text-tand-appr-1",
  placeholder,
  error = false,
  errorText,
  suffixText,
  preffixText,
}: {
  onChange: any
  formik: FormikValues
  value: any
  name: string
  disabled?: boolean
  label?: string
  styleLabel?: string
  subLabel?: string
  styleSubLabel?: string
  placeholder?: string
  error?: string | boolean
  errorText?: string
  suffixText?: string
  preffixText?: string
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [fileName, setFileName] = useState("")
  const [selectedFile, setSelectedFile] = useState<any>(null)

  async function createFile(
    fileUrl: string,
    fileName: string,
    fileType: string
  ) {
    let response = await fetch(fileUrl)
    let data = await response.blob()
    let metadata = {
      type: fileType,
    }
    let file = new File([data], fileName, metadata)

    return file
  }

  async function createFileFromUrl(fileUrl: string) {
    let response = await fetch(fileUrl, {
      mode: "cors",
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    let data = await response.blob()

    // let metadata = {
    //   type: fileType,
    // }
    // let file = new File([data], fileName, metadata)

    // return file
  }

  useEffect(() => {
    if (value) {
      // createFileFromUrl(value)
      createFile(value.url_dokumen, value.name, value.type).then((itemFile) => {
        setFileName(itemFile.name)
      })
    }
  }, [value])

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files

    if (files) {
      if (files[0]) {
        setSelectedFile(files[0])
        setFileName(files[0].name)
      }
    }
  }

  useEffect(() => {
    onChange({ target: { value: selectedFile, name } })
  }, [selectedFile])

  return (
    <div className="flex flex-col">
      {label && (
        <label className={` ${styleLabel} ${error ? " text-tand-error" : ""}`}>
          {label}{" "}
          {subLabel && (
            <span
              className={`${styleSubLabel} ${error ? " text-tand-error" : ""}`}
            >
              {subLabel}
            </span>
          )}
        </label>
      )}
      <div className="flex flex-row gap-x-1.5 mt-1.5 ">
        <div
          className={`flex-1 flex flex-row py-3.5 px-4 gap-x-2 w-full border rounded-[5px] ${
            error ? "border-tand-error" : "border-[#E1E1E1]"
          }`}
        >
          {preffixText && (
            <>
              <div className="text-sm font-normal flex items-center text-tand-appr-2 pr-3 mr-2 border-r-[1px] border-[#E1E1E1]">
                {preffixText}
              </div>
            </>
          )}
          <input
            readOnly
            disabled={disabled}
            onClick={() => fileInputRef.current?.click()}
            value={fileName}
            className={`overflow-hidden focus:outline-none text-tand-appr-1 text-sm font-normal grow cursor-pointer`}
            placeholder={placeholder}
          />
          {suffixText && (
            <div className="text-sm font-normal items-center ">
              {suffixText}
            </div>
          )}
        </div>
        <Button
          buttonType="primary"
          label="Pilih file"
          className="px-4 py-3 bg-tand-6 !text-tand-2 hover:!bg-tand-6 hover:!text-tand-2 shadow-none"
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          name={name}
          ref={fileInputRef}
          accept="image/*"
          onChange={handleOnChange}
          onBlur={(e) => {
            formik.handleBlur(e)
          }}
          type="file"
          className="sr-only"
        />
      </div>
      {error && (
        <span className="text-xs text-tand-error mt-1.5">{errorText}</span>
      )}
    </div>
  )
}
