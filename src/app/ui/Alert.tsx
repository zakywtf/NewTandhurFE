import { Transition } from "@headlessui/react"
import { ExclamationIcon } from "@heroicons/react/solid"
import Lottie from 'react-lottie'
import CheckLottie from "@/lottie/check.json"
import Button from "./fields/Button"

export default function Alert({
  status = "error",
  title = "",
  content = "",
  labelPositive,
  labelNegative,
  onClickPositive,
  onClickNegative,
  show = false,
}: {
  status: string
  title: string
  content: string
  labelPositive: string
  labelNegative: string
  onClickPositive: () => void
  onClickNegative: () => void
  show: boolean
}) {
  const defaultCheckOptions = {
    loop: true,
    autoplay: true,
    animationData: CheckLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  function icon() {
    if (status == "confirmation") {
      return <ExclamationIcon className="w-16 h-16 text-tand-warning-1" />
    } else if (status == "success") {
      return (
        <div className="w-[128px] h-[128px]">
          <Lottie options={defaultCheckOptions} height={128} width={128} />
        </div>
      )
    } else if (status == "failed") {
      return (
        <div className="w-[128px] h-[128px]">
          <Lottie options={defaultCheckOptions} height={128} width={128} />
        </div>
      )
    }
  }

  return (
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
        <div className="p-8 flex flex-col w-full md:w-[853px]  rounded-[12px] bg-white">
          <div className="mb-8 flex flex-col justify-start">{icon()}</div>
          <span className="text-2xl font-semibold text-tand-appr-1">
            {title}
          </span>
          <span className="text-sm font-normal text-tand-appr-2 mt-1">
            {content}
          </span>
          <div className="mt-6 flex flex-row gap-x-6">
            {labelNegative && (
              <Button
                buttonType="secondary"
                label={labelNegative}
                className="flex-1"
                onClick={onClickNegative}
              />
            )}
            {labelPositive && (
              <Button
                buttonType="primary"
                label={labelPositive}
                className="flex-1"
                onClick={onClickPositive}
              />
            )}
          </div>
        </div>
      </div>
    </Transition>
  )
}
