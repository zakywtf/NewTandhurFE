import { authOptions } from "@/app/server/auth"
import { convertToIndonesiaTanggal, priceSplitter } from "@/helpers/helper"
import { getServerSession } from "next-auth"

export default async function Page(params: { params: { id: string } }) {
  const response = await fetchDataOnServer(params.params.id)
  const data = await response.json()

  return (
    <div className="mx-8 flex flex-col gap-2">
      <div className={`mt-10 flex flex-row justify-between`}>
        <span className="text-3xl font-semibold capitalize">{data.data.farmer_name}</span>
        <span className="text-base font-semibold text-tand-appr-1">
          <span>Cetak Riwayat</span>
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
          <span className="font-semibold text-lg text-tand-appr-1 pr-6 border-r-[1px] border-[#EEEEEE] mr-4">
            Rekap Kegiatan
          </span>
          <div className="w-full h-[1px] bg-[#EEEEEE] my-4" />
          <div className="flex flex-wrap">
            <span className="w-2/4 text-lg">Nama Kegiatan</span>
            <span className="w-2/4 text-lg">Tanggal Kegiatan</span>
            {data.data.activities.map((activity: any) => {
              return (
                <div key={crypto.randomUUID()} className="w-full flex">
                  <span className="w-2/4">{activity.activity_name}</span>
                  <span className="w-2/4">
                    {convertToIndonesiaTanggal(activity.activity_date)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
          <span className="font-semibold text-lg text-tand-appr-1 pr-6 border-r-[1px] border-[#EEEEEE] mr-4">
            Rekap Biaya Operasional
          </span>
          <div className="w-full h-[1px] bg-[#EEEEEE] my-4" />
          <div className="flex flex-wrap">
            <span className="w-2/4 text-lg">Nama Kegiatan</span>
            <span className="w-2/4 text-lg">Biaya Operasional</span>
            {data.data.operation_costs.datas.map((activity: any) => {
              return (
                <div key={crypto.randomUUID()} className="w-full flex">
                  <span className="w-2/4">{activity.activity_name}</span>
                  <span className="w-2/4">
                    {convertToIndonesiaTanggal(activity.activity_date)}
                  </span>
                </div>
              )
            })}
            <div className="w-2/4 ms-auto">
              <div className="w-full h-[1px] bg-[#000] my-4" />
              <p>Total Biaya Operasional</p>
              {
                <span>
                  Rp.
                  {priceSplitter(
                    data.data.operation_costs.datas.total?.toString() ?? "0"
                  )}
                </span>
              }
            </div>
          </div>
        </div>

        <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
          <span className="font-semibold text-lg text-tand-appr-1 pr-6 border-r-[1px] border-[#EEEEEE] mr-4">
            Rekap Hasil Panen
          </span>
          <div className="w-full h-[1px] bg-[#EEEEEE] my-4" />
          <div className="flex flex-wrap">
            <span className="w-2/4 text-lg">Nama Panen</span>
            <span className="w-2/4 text-lg">Jumlah Panen</span>
            {data.data.harvests.datas.map((harvest: any) => {
              return (
                <div key={crypto.randomUUID()} className="w-full flex">
                  <span className="w-2/4">{harvest.name}</span>
                  <span className="w-2/4">{harvest.amount}</span>
                </div>
              )
            })}
            <div className="w-2/4 ms-auto">
              <div className="w-full h-[1px] bg-[#000] my-4" />
              <p>Total Panen</p>
              <span>{data.data.harvests.total}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
          <span className="font-semibold text-lg text-tand-appr-1 pr-6 border-r-[1px] border-[#EEEEEE] mr-4">
            Rekap Penjualan
          </span>
          <div className="w-full h-[1px] bg-[#EEEEEE] my-4" />
          <div className="flex flex-wrap">
            <span className="w-1/4 text-lg">Nama Penjualan</span>
            <span className="w-1/4 text-lg">Tanggal Penjualan</span>
            <span className="w-1/4 text-lg">Jumlah Penjualan</span>
            <span className="w-1/4 text-lg">Harga</span>
            {data.data.sellings.datas.map((activity: any) => {
              return (
                <div key={crypto.randomUUID()} className="w-full flex">
                  <span className="w-1/4">{activity.activity_name}</span>
                  <span className="w-1/4">
                    {convertToIndonesiaTanggal(activity.activity_date)}
                  </span>
                  <span className="w-1/4">
                    {convertToIndonesiaTanggal(activity.activity_date)}
                  </span>
                  <span className="w-1/4">
                    {convertToIndonesiaTanggal(activity.activity_date)}
                  </span>
                </div>
              )
            })}
            <div className="w-1/4 ms-auto">
              <div className="w-full h-[1px] bg-[#000] my-4" />
              <p>Total Penjualan</p>
              <span>
                Rp.
                {priceSplitter(data.data.sellings.total?.toString() ?? "0")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
          <span className="font-semibold text-lg text-tand-appr-1 pr-6 border-r-[1px] border-[#EEEEEE] mr-4">
            Rekap Pendapatan
          </span>
          <div className="w-full h-[1px] bg-[#EEEEEE] my-4" />
          <div className="flex flex-wrap">
            <span className="w-2/4 text-lg">Penjualan</span>
            <span className="w-2/4 text-lg">
              Rp.
              {priceSplitter(
                data.data.incomes.total_sellings?.toString() ?? "0"
              )}
            </span>
            <span className="w-2/4 text-lg">Biaya Operasional</span>
            <span className="w-2/4 text-lg">
              Rp.
              {priceSplitter(
                data.data.incomes.total_operating_costs?.toString() ?? "0"
              )}
            </span>
            <div className="w-full">
              <div className="w-2/4 ms-auto h-[1px] bg-[#000] my-4" />
            </div>
            <span className="w-2/4 text-lg">Total Pendapatan</span>
            <span className="w-2/4 text-lg">
              Rp.
              {priceSplitter(
                data.data.incomes.total_incomes?.toString() ?? "0"
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

async function fetchDataOnServer(id: string) {
  const session = await getServerSession(authOptions)

  const baseUrl = process.env.BASE_API_EXT_URL

  if (id) {
    const response = await fetch(`${baseUrl}/history/filter/cycle/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    })

    if (response.ok) {
      const body = await response.json()

      if (body.status == 200) {
        return Response.json(body)
      }

      return Response.json(
        {
          status: body.status,
          message: body.message,
          data: null,
        },
        {
          status: body.status,
          statusText: body.message,
        }
      )
    }

    return Response.json(
      {
        status: 500,
        message: "failed",
        data: null,
      },
      {
        status: 500,
        statusText: "failed",
      }
    )
  }

  return Response.json(
    {
      status: 500,
      message: "failed",
      data: null,
    },
    {
      status: 500,
      statusText: "failed",
    }
  )
}
