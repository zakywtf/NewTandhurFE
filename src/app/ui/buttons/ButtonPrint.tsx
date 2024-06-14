"use client"

import { convertToIndonesiaTanggal, priceSplitter } from "@/helpers/helper"
import { ButtonProp } from "@/interfaces/ButtonProp"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import moment from "moment"
import React from "react"

const ButtonPrint: React.FC<ButtonProp> = ({
  label = "Button",
  disabled = false,
  loading = false,
  type = "button",
  onClick = () => null,
  shadow = true,
  width = "full",
  className = "",
  icon,
  data,
}) => {
  const handlePrintPdf = () => {
    const fileName = `rekap-laporan-${moment().format('DD-MM-YYYY')}`
    const doc = new jsPDF()
    const activitiesBody = data.data.activities.map((activity: any) => {
      return [
        activity.activity_name,
        convertToIndonesiaTanggal(activity.activity_date),
      ]
    })
    const operationCostsBody = data.data.operation_costs.datas.map(
      (operation: any) => {
        return [
          operation.name,
          `Rp.${priceSplitter(operation.amount?.toString() ?? "0")}`,
        ]
      }
    )

    const harvestBody = data.data.harvests.datas.map((harvest: any) => {
      return [harvest.name, harvest.amount]
    })

    const sellingsBody = data.data.sellings.datas.map((selling: any) => {
      return [
        selling.name,
        convertToIndonesiaTanggal(selling.selling_date),
        selling.amount,
        `Rp.${priceSplitter(selling.price?.toString() ?? "0")}`,
      ]
    })

    const incomesBody = [
      [
        `Rp.${priceSplitter(
                data.data.incomes.total_sellings?.toString() ?? "0"
              )}`,
        `Rp.${priceSplitter(
                data.data.incomes.total_operating_costs?.toString() ?? "0"
              )}`,
        `Rp.${priceSplitter(
                data.data.incomes.total_incomes?.toString() ?? "0"
              )}`,
      ],
    ]

    autoTable(doc, {
      head: [["Rekap Kegiatan", "Tanggal Kegiatan"]],
      body: activitiesBody,
    })

    autoTable(doc, {
      head: [["Rekap Biaya Operasional", "Biaya Operasional"]],
      body: operationCostsBody,
    })

    autoTable(doc, {
      head: [["Rekap Hasil Panen", "Jumlah Panen"]],
      body: harvestBody,
    })

    autoTable(doc, {
      head: [["Rekap Penjualan", "Tanggal", "Jumlah", "Harga"]],
      body: sellingsBody,
    })

    autoTable(doc, {
      head: [["Penjualan", "Biaya Operasional", "Total Pendapatan"]],
      body: incomesBody,
    })

    doc.save(fileName)
  }

  return (
    <button
      type={type}
      onClick={handlePrintPdf}
      disabled={disabled}
      className={`font-semibold text-sm text-white w-${width} py-3 rounded-[5px] flex flex-row items-center justify-center ${
        shadow ? "shadow-button" : ""
      } ${
        disabled
          ? "bg-tand-appr-5 shadow-none"
          : "bg-tand-1 hover:bg-tand-4 active:bg-tand-5"
      } ${className}`}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {icon && icon}
      <span>{label}</span>
    </button>
  )
}

export default ButtonPrint
