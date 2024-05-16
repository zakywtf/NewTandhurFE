import { Transition } from "@headlessui/react"

const Loading = ({ show = false }: { show: boolean }) => {
  return (
    <>
      <Transition
        appear
        show={show}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="w-screen fixed top-0 left-0 bottom-0 right-0 h-screen bg-black/[0.4] z-20 flex items-center justify-center">
          <div className="w-32 h-32 bg-white rounded-[12px] flex items-center justify-center">
            <svg
              className="animate-spin h-8 w-8 text-tand-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      </Transition>
    </>
  )
}

export default Loading
