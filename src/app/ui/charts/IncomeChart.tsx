import { Chart, registerables } from "chart.js"
import { Line } from "react-chartjs-2"
Chart.register(...registerables)

import React, { useEffect, useRef } from "react"

interface IncomeLineChartProps {
  income_data: any[]
}

const IncomeLineChart: React.FC<IncomeLineChartProps> = ({income_data}) => {

  const chartRef = useRef<Chart | null>(null)
  const yScaleText = {
    id: "yScaleText",
    afterDraw(chart: any, args: any, options: any) {
      const {
        ctx,
        chartArea: { top },
      } = chart
      ctx.save()
      ctx.font = "12px Poppins"
      ctx.fillStyle = "#18181966"
      ctx.fillText("Jumlah Pendapatan", 0, top - 25)

      ctx.restore()
    },
  }

  const data = {
    labels: [],
    datasets: [
      {
        data: [],
        borderColor: "#000",
        backgroundColor: "#00",
        tension: 0.1,
        fill: false,
        pointStyle: "circle",
        pointRadius: 5,
        datalabels: {
          display: false,
        },
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 50,
      },
    },
    scales: {
      x: {
        ticks: {
          precision: 0,
        },
        beginAtZero: true,
        grid: {
          display: false,
        },
        font: {
          size: 12,
          family: "Poppins",
        },
      },
      y: {
        scaleLabel: {
          display: true,
          labelString: "probability",
        },
        ticks: {
          maxTicksLimit: 5,
          stepSize: 1000,
        },
        beginAtZero: true,
        grid: {
          display: false,
          borderDash: [4, 4],
        },
        font: {
          size: 12,
          family: "Poppins",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "rgb(255, 99, 132)",
          usePointStyle: false,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: { formattedValue: string }) {
            return context.formattedValue
          },
        },
      },
    },
  }

  useEffect(() => {
    if (chartRef.current) {
      if (income_data.length != 0) {
        const labels = income_data.map((data) => data.x)
        const values = income_data.map((data) => data.y)
        chartRef.current.data.labels = labels
        chartRef.current.data.datasets[0].data = values
        chartRef.current.update()
      }
    }
  })

  return (
    <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
      <div className="flex flex-row">
        <span className="font-semibold text-lg text-tand-appr-1 pr-6 border-r-[1px] border-[#EEEEEE] mr-4">
          Pendapatan Panen Terkini
        </span>
      </div>
      <div className="h-[350px]">
        <Line
          ref={(el) => {
            if (el) {
              chartRef.current = el
            }
          }}
          data={data}
          options={options}
          plugins={[yScaleText]}
          className="!h-full"
        />
      </div>
    </div>
  )
}

export default IncomeLineChart
