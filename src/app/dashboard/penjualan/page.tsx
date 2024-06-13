"use client"

import CardPenjualan from "@/app/ui/cards/CardPenjualan"
import Button from "@/app/ui/fields/Button"
import FormInputBuyer from "@/app/ui/forms/FormInputBuyer"
import FormInputPenjualan from "@/app/ui/forms/FormInputPenjualan"
import Loading from "@/app/ui/loading"
import Modal from "@/app/ui/modals/Modal"
import CardPagination from "@/app/ui/paginations/CardPagination"
import {
  CREATE_SELL_FULFILLED,
  GET_ALL_SELL_FULFILLED,
  GET_SELL_BY_ID_FULFILLED,
  INIT,
  UPDATE_SELL_FULFILLED,
} from "@/helpers/const"
import { convertToIndonesiaTanggal, priceSplitter } from "@/helpers/helper"
import { createBuyer } from "@/helpers/libs/features/actions/buyerAction"
import {
  createSell,
  getSells,
} from "@/helpers/libs/features/actions/sellingAction"
import { useAppDispatch, useAppSelector, useFarmer } from "@/helpers/libs/hooks"
import { FormBuyerData } from "@/interfaces/FormBuyer"
import { FormPenjualanData } from "@/interfaces/FormPenjualan"
import { PlusIcon } from "@heroicons/react/solid"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
  const {
    data: sellData,
    status: sellStatus,
    type: sellType,
    total_item: sellTotalItems,
  } = useAppSelector((state) => state.sell)

  const dispatch = useAppDispatch()
  const farmer = useFarmer()
  const searchParams = useSearchParams()
  const [showSellModal, setShowSellModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showBuyerModal, setShowBuyerModal] = useState(false)
  const [paginationData, setPaginationData] = useState<{
    page: number
    isHidden: boolean
    isMaxPage: boolean
    items: any[]
  }>({ page: 1, isHidden: true, isMaxPage: false, items: [] })

  const handleSubmitCreateSell = async (
    payload: FormPenjualanData,
    action: any
  ) => {
    setIsLoading(true)
    const farmerLandId = searchParams.get("farmer_land_id")

    if (farmerLandId) {
      payload.farmer_land_id = farmerLandId ?? ""
      dispatch(createSell(payload))
    }

    action.setSubmitting(true)
  }

  const handleBuyerCreate = async (payload: FormBuyerData, action: any) => {
    setIsLoading(true)
    dispatch(createBuyer(payload))
    setShowBuyerModal(false)
    action.setSubmitting(true)
  }

  useEffect(() => {
    const farmerLandId = searchParams.get("farmer_land_id")
    if (farmerLandId) {
      if (sellType == INIT) {
        dispatch(getSells({ page: 1, limit: 10, farmer_land_id: farmerLandId }))
      }

      if (sellType == GET_ALL_SELL_FULFILLED) {
        setIsLoading(false)
      }
      if (sellType == CREATE_SELL_FULFILLED) {
        setPaginationData({
          page: 1,
          isHidden: true,
          isMaxPage: false,
          items: [],
        })
        dispatch(getSells({ page: 1, limit: 10, farmer_land_id: farmerLandId }))
        setIsLoading(false)
        setShowSellModal(false)
      }
      if (
        sellType == GET_SELL_BY_ID_FULFILLED ||
        sellType == UPDATE_SELL_FULFILLED
      ) {
        setPaginationData({
          page: 1,
          isHidden: true,
          isMaxPage: false,
          items: [],
        })
        dispatch(getSells({ page: 1, limit: 10, farmer_land_id: farmerLandId }))
      }
    }
  }, [sellData, sellStatus, sellType])

  useEffect(() => {
    if (sellType == GET_ALL_SELL_FULFILLED) {
      const sells = paginationData.items.concat(sellData)

      if (sells.length != 0 && sells.length <= sellTotalItems) {
        if (
          sells.length == sellTotalItems &&
          paginationData.isMaxPage == false &&
          paginationData.isHidden == false
        ) {
          setPaginationData((prevState) => {
            return {
              ...prevState,
              items: sells,
              isMaxPage: true,
            }
          })
        }
        if (
          sells.length == sellTotalItems &&
          paginationData.isMaxPage == false &&
          paginationData.isHidden == true
        ) {
          setPaginationData((prevState) => {
            return {
              ...prevState,
              items: sells,
            }
          })
        }
        if (
          sells.length < sellTotalItems &&
          paginationData.isMaxPage == false
        ) {
          setPaginationData((prevState) => {
            return {
              ...prevState,
              items: sells,
            }
          })
        }
      }
    }
  }, [paginationData, sellTotalItems, sellData, searchParams])

  return (
    <div className="mx-8 flex flex-col gap-2">
      <Loading show={isLoading} />
      <h1 className="text-3xl font-semibold mt-10">Daftar Penjualan</h1>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mt-2">
          {farmer == null ? "Lahan Belum Dipilih" : `${farmer.farmerLand}`}
        </h2>
      </div>

      <div className="flex justify-end">
        <Button
          buttonType="primary"
          label="Tambah Penjualan"
          disabled={false}
          className="ml-auto px-4"
          width="auto"
          icon={<PlusIcon className="w-3 h-3 mr-2.5" />}
          onClick={() => setShowSellModal(true)}
        />
      </div>
      <div className="gap-y-8 flex flex-col">
        {paginationData.isHidden
          ? paginationData.items.slice(0, 2).map((sell, index) => {
              return (
                <CardPenjualan
                  key={crypto.randomUUID()}
                  link={`penjualan/${
                    sell._id
                  }?farmer_land_id=${searchParams.get("farmer_land_id")}`}
                  name={sell.name}
                  data={[
                    {
                      name: "Pembeli",
                      value: `${sell.buyer_id.name} (${sell.buyer_id.agency})`,
                    },
                    {
                      name: "Jumlah Penjualan",
                      value: `${sell.amount} (${sell.unit})`,
                    },
                    {
                      name: "Tanggal Penjualan",
                      value: convertToIndonesiaTanggal(sell.selling_date),
                    },
                    {
                      name: "Total Harga Penjualan",
                      value: `Rp.${priceSplitter(sell.price)}`,
                    },
                  ]}
                />
              )
            })
          : paginationData.items.map((sell, index) => {
              return (
                <CardPenjualan
                  key={crypto.randomUUID()}
                  link={`penjualan/${
                    sell._id
                  }?farmer_land_id=${searchParams.get("farmer_land_id")}`}
                  name={sell.distributor}
                  data={[
                    {
                      name: "Pembeli",
                      value: `${sell.buyer_id.name} (${sell.buyer_id.agency})`,
                    },
                    {
                      name: "Jumlah Penjualan",
                      value: `${sell.amount} (${sell.unit})`,
                    },
                    {
                      name: "Tanggal Penjualan",
                      value: convertToIndonesiaTanggal(sell.selling_date),
                    },
                    {
                      name: "Total Harga Penjualan",
                      value: `Rp.${priceSplitter(sell.price)}`,
                    },
                  ]}
                />
              )
            })}
      </div>

      {paginationData.isMaxPage == false && sellData.length != 0 ? (
        <CardPagination
          onClick={() => {
            if (paginationData.isHidden == true) {
              setPaginationData((prevState) => {
                return {
                  ...prevState,
                  isHidden: false,
                }
              })
            } else {
              setIsLoading(true)
              const farmerLandId = searchParams.get("farmer_land_id") ?? ""
              dispatch(
                getSells({
                  page: paginationData.page + 1,
                  limit: 10,
                  farmer_land_id: farmerLandId,
                })
              )
              setPaginationData((prevState) => {
                return {
                  ...prevState,
                  page: prevState.page + 1,
                }
              })
            }
          }}
        />
      ) : null}

      <Modal isShow={showSellModal} className="w-modal-3 h-[550px]">
        <FormInputPenjualan
          initialValues={{
            farmer_land_id: "",
            name: "",
            selling_date: "",
            amount: 0,
            unit: null,
            price: 0,
            proof_payment: null,
            commodity_id: {
              _id: "",
              name: "",
            },
            buyer_id: {
              _id: "",
              name: "",
            },
            cycle_id: {
              _id: "",
              name: "",
            },
          }}
          onSubmit={handleSubmitCreateSell}
          onCloseModal={() => setShowSellModal(false)}
          onOpenBuyerModal={() => setShowBuyerModal(true)}
        />
      </Modal>

      <Modal isShow={showBuyerModal} className="w-modal-3 h-[550px]">
        <FormInputBuyer
          initialValues={{
            agency: "",
            name: "",
            phone: "",
            province: null,
            regencies: null,
            district: null,
            village: null,
          }}
          onSubmit={handleBuyerCreate}
          onCloseModal={() => setShowBuyerModal(false)}
        />
      </Modal>
    </div>
  )
}
