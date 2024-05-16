"use client"

import { AutoCompleteProp } from '@/interfaces/AutoComplete';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';
import { useField } from "formik";
import React, { Fragment, useState } from 'react';


const AutoCompleteField: React.FC<AutoCompleteProp> = ({
  name, 
  disabled = false, 
  placeholder="",
  label,
  onChange,
  styleLabel="text-sm font-medium text-tand-appr-1",
  subLabel,
  styleSubLabel="text-sm font-medium text-tand-appr-1",
  error = false , 
  errorText ,
  listItem = [],
  formik
}) => {

  const [ field ] = useField({ name });


  const [ showOption, setShowOption ] = useState(false)


  const [query, setQuery] = useState('')


  const filteredPeople =
    query === ''
      ? listItem
      : listItem.filter((item) => {
          if(item.name) {
            return item.name
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, ''))
          }
        })


  return (
    <div className="flex flex-col">
      { label && <label className={` ${styleLabel} ${error ? ' text-tand-error' : ''}`}>{ label } { subLabel && <span className={`${styleSubLabel} ${error ? ' text-tand-error' : ''}`}>{subLabel}</span> }</label> }
      <div className="w-full mt-1.5 ">
        <Combobox value={field.value} disabled={disabled} onChange={(valueF) => {
            formik.setFieldTouched(name, false);
            onChange({ target: { value : valueF, name } });
            setShowOption(false)
          }} name={name} >
            <div className="relative">
              <div className={`relative w-full cursor-default overflow-hidden rounded-[5px] bg-white  text-left focus:outline-none border  ${ error ? 'border-tand-error' : 'border-[#E1E1E1]' } bg-white`}>
                <ComboboxInput
                  onClick={() => {
                    formik.setFieldTouched(name, true)
                    setShowOption(true)
                  }}
                  onBlur={(e) => {
                    formik.handleBlur(e)
                    // setShowOption(false)
                  }}
                  className="w-full border-none py-3.5 pl-4 pr-10 text-sm leading-5 text-gray-900 focus:outline-none"
                  displayValue={(person: any) => person?.name}
                  placeholder={placeholder}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setShowOption(true)
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer" onClick={() => setShowOption(true) }>
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <Transition
                show={showOption}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ComboboxOptions className="absolute shadow-main-1 z-10 mt-1 max-h-60 w-full overflow-y-scroll no-scrollbar rounded-md bg-white text-base ring-1 ring-black ring-opacity-5 focus:border-red-900 sm:text-sm">
                  {filteredPeople.map((item, itemIdx) => (
                    <ComboboxOption
                      key={itemIdx}
                      className={({ focus, selected }) =>
                        `relative cursor-pointer text-sm font-normal select-none py-3.5 px-4 hover:bg-tand-3 bg-white ${
                          focus ? 'bg-tand-3' : 'bg-white'
                        } ${
                          selected ? 'bg-tand-3' : 'bg-white'
                        }`
                      }
                      value={item}
                    >
                      <span
                        className={`block truncate ${
                          field.value ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.name}
                      </span>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              </Transition>
            </div>
        </Combobox>
      </div>
      { error && <span className="text-xs text-tand-error mt-1.5">{errorText}</span>}
    </div>
  )
}

export default AutoCompleteField
