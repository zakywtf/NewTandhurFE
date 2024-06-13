"use client"

import { useAppDispatch, useAppSelector } from "@/helpers/libs/hooks"
import { useEffect, useState } from "react"
import AutoCompleteField from "./AutoCompleteField"

const DynamicAutoCompleteField = (props: any) => {
  // const { type, data, status} = useSelector((state) => state.master);
  const [listItem, setListItem] = useState<any[]>([])

  const { type, data, status } = useAppSelector((state) => state.region)

  const dispatch = useAppDispatch()
  const propsField = { ...props }

  const { masterDispatch, parentId = "", disabled, onLoadItem } = propsField

  useEffect(() => {
    if (!disabled) {
      dispatch(masterDispatch(parentId))
    }
    // props.formik.setFieldValue(props.name, null)
    if (onLoadItem) {
      onLoadItem()
    }
  }, [parentId, disabled])

  useEffect(() => {

    props.formik.setFieldValue(props.name, props.value)
  }, [props.value])

  useEffect(() => {
    if (type == propsField.typeMaster) {
      setListItem(data)
    }
  }, [data, status, type])

  return (
    <>
      <AutoCompleteField {...props} listItem={listItem} />
    </>
  )
}

export default DynamicAutoCompleteField
