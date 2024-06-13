"use client"

import { useEffect, useState } from "react"
import AutoCompleteField from "./AutoCompleteField"
import { GET_ALL_COMMODITY_FULFILLED } from "@/helpers/const"

const AutoCompleteSearchField = (props: any) => {
  const [listItem, setListItem] = useState<any[]>([])

  const { type, data, status } = props.state

  const propsField = { ...props }

  const { disabled, onLoadItem } = propsField

  useEffect(() => {
    if (!disabled && type != GET_ALL_COMMODITY_FULFILLED) {
      props.onFetchData()
    }
    if (onLoadItem) {
      onLoadItem()
    }
  }, [disabled])

  useEffect(() => {

    props.formik.setFieldValue(props.name, props.value)
  }, [props.value])

  useEffect(() => {
    if (type == propsField.type) {
      setListItem(data)
    }
  }, [data, status, type])
  

  return (
    <>
      <AutoCompleteField {...props} listItem={listItem} />
    </>
  )
}

export default AutoCompleteSearchField
