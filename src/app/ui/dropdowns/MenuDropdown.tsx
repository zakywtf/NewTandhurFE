"use client"

import { DropdownData, DropdownProp } from "@/interfaces/DropdownProp"
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import React, { Fragment, useEffect, useState } from "react"

const MenuDropdown: React.FC<DropdownProp> = ({ items = [], onChange }) => {
  const [data, setData] = useState<DropdownData>(items[0])

  useEffect(() => {
    onChange(data)
  }, [data])

  return (
    <div className="w-56">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full text-sm font-medium justify-center focus:outline-none text-tand-2">
            {data.name}
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-tand-2"
              aria-hidden="true"
            />
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-[5px] bg-white shadow-main-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
            {items.map((item) => (
              <MenuItem key={crypto.randomUUID()}>
                {({ focus }) => (
                  <button
                    onClick={() => setData(item)}
                    className={`${
                      focus ? "bg-tand-9 text-tand-2" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-3 py-2 text-sm`}
                  >
                    {item.name}
                  </button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}

export default MenuDropdown
