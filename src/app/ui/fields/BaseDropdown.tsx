"use client"

import { Fragment, useState } from "react"
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react"
import { ifemptyData } from "@/helpers/helper"
import { DropdownFieldsProps } from "@/interfaces/DropdownFieldProp"
import { SelectorIcon } from "@heroicons/react/solid"

type DropdownItem = {
  id: string
  name: string
}

export default function BaseDropdownField(params: DropdownFieldsProps) {
  const {
    className,
    name,
    disabled = false,
    label,
    styleLabel = "text-sm font-medium text-tand-appr-1",
    type = "text",
    subLabel,
    styleSubLabel = "text-sm font-medium text-tand-appr-1",
    error = false,
    errorText,
    listItem = [],
    onChange,
  } = params

  const [item, setItem] = useState(
    listItem.length == 0 ? "Pilih" : listItem[0].name
  )

  return (
    <div className={`flex flex-col ${className} `}>
      {label && (
        <label className={` ${styleLabel} `}>
          {label}{" "}
          {subLabel && <span className={`${styleSubLabel}`}>{subLabel}</span>}
        </label>
      )}
      <div className={`w-full ${label ? "mt-1.5" : ""}`}>
        <Listbox
          value={listItem}
          disabled={disabled}
          onChange={(value: any) => {
            const data = value as DropdownItem
            onChange(data)
            setItem(data.name)
          }}
          //   onChange={(value) => {
          //     field.onChange({ target: { value, name } })
          //   }}
          name={name}
        >
          <div className={`relative`}>
            <ListboxButton
              className={`w-full cursor-pointer min-h-[50px]  rounded-[5px] bg-white py-3.5 pl-4 pr-10 text-left  border border-[#E1E1E1]`}
            >
              <span className="text-tand-appr text-sm font-normal">{item}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute shadow-main-1 z-10 mt-1 max-h-60 w-full overflow-y-scroll no-scrollbar rounded-md bg-white text-base ring-1 ring-black ring-opacity-5 focus:border-red-900 sm:text-sm">
                {listItem.map((item, itemIdx) => (
                  <ListboxOption
                    key={itemIdx}
                    className={({ active, selected }) =>
                      `relative cursor-pointer text-sm font-normal select-none py-3.5 px-4 ${
                        active ? "bg-tand-3" : "bg-white"
                      } ${selected ? "bg-tand-3" : "bg-white"}`
                    }
                    value={item}
                  >
                    <span className={`block truncate ${"font-medium"}`}>
                      {item.name}
                    </span>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </Listbox>
      </div>
      {error && (
        <span className="text-xs text-tand-error mt-1.5">{errorText}</span>
      )}
    </div>
  )
}
