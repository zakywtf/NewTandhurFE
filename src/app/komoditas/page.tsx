"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import BaseDropdownField from "../ui/fields/BaseDropdown"
import Loading from "../ui/loading"

export default function Page() {
  const router = useRouter()
  const [commodity, setCommodity] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [commodities, setCommodities] = useState({
    pertanian: [],
    perkebunan: [],
  })
  const fetchCommodities = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json()

    return data
  }

  const saveCommodity = async (
    url: string,
    formData: { id: string; name: string }
  ) => {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/commodity`
    const setUpInterface = async () => {
      const data = await fetchCommodities(url)
      
      if (data.status == 200) {
        const pertanian = data.data
          .filter((commodity: any) => commodity.type_commodity == "pertanian")
          .map((commodity: any) => {
            return {
              id: commodity._id,
              name: commodity.name,
            }
          })

        const perkebunan = data.data
          .filter((commodity: any) => commodity.type_commodity == "perkebunan")
          .map((commodity: any) => {
            return {
              id: commodity._id,
              name: commodity.name,
            }
          })

        setCommodities({ pertanian: pertanian, perkebunan: perkebunan })
      }
    }

    setUpInterface()
  }, [])

  useEffect(() => {
    if (commodity != null) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/commodity/save-selected-commodity`
      setIsLoading(true)
      const saveCommodityToServer = async () => {
        const data = await saveCommodity(url, commodity)
4
        router.push("/")
        
      }
      saveCommodityToServer()
    }
  }, [commodity])
  return (
    <main className="w-3/4 mx-auto text-tand-appr-1">
      <Loading show={isLoading} />
      <h1 className="text-3xl font-semibold mt-10">Tandhur</h1>
      <h2 className="text-2xl font-semibold mt-1">Pilih Komoditas</h2>
      <div className="mt-4 flex gap-4">
        <BaseDropdownField
          className="w-1/4"
          label={"Pilih Pertanian"}
          name={"pertanian"}
          listItem={commodities.pertanian}
          onChange={(value) => {
            setCommodity(value)
          }}
        />
        <BaseDropdownField
          className="w-1/4"
          label={"Pilih Perkebunan"}
          name={"perkebunan"}
          listItem={commodities.perkebunan}
          onChange={(value) => {
            setCommodity(value)
          }}
        />
      </div>
    </main>
  )
}
