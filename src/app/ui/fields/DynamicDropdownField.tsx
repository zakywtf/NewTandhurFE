"use client"

import { useEffect } from "react"
import DropdownField from "./DropdownField"

export default function DynamicDropdownField(props: any) {
  //   const { type, data, status } = useSelector((state) => state.master)
  //   const [listItem, setListItem] = useState([])

  //   const dispatch = useDispatch()
  const propsField = { ...props }

  const {
    masterDispatch,
    parentId = "",
    disabled,
    onLoadItem,
    listItem,
  } = propsField

  useEffect(() => {
    if (!disabled) {
      //   console.log(masterDispatch)
      //   dispatch(masterDispatch(parentId))
    }

    props.formik.setFieldValue(props.name, null)
    if (onLoadItem) {
      onLoadItem()
    }
  }, [parentId, disabled])

  useEffect(() => {
    props.formik.setFieldValue(props.name, props.value)
  }, [props.value])

  useEffect(() => {
    // if (type == propsField.typeMaster) {
    //   setListItem(data)
    //   console.log(data)
    //   if (data[0]) {
    //     props.formik.setFieldValue(props.name, data[0])
    //   }
    // }
  }, [])

  return (
    <>
      <DropdownField {...props} listItem={listItem} />
    </>
  )
}
