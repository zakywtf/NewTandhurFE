import { Transition } from "@headlessui/react"
import React from "react"

const Modal: React.FC<ModalProp> = ({
  className = "w-modal-2 h-modal-1",
  isShow = false,
  children,
}) => {
  return (
    <Transition
      appear
      show={isShow}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="w-screen fixed top-0 left-0 bottom-0 right-0 h-screen bg-black/[0.4] z-20 flex items-center justify-center">
        <div className={className}>{children}</div>
      </div>
    </Transition>
  )
}

export default Modal
