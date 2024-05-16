
import { CardProps } from "@/interfaces/CardProp"
import { PencilIcon, TrashIcon } from "@heroicons/react/solid"
import Link from "next/link"

const CardPenjualan: React.FC<CardProps> = ({ name, data, isDetail, link, onClick }) => {
  return (
    <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
      <div className="flex flex-row justify-between">
        {isDetail && (
          <>
            <div
              onClick={onClick}
              className="flex flex-row gap-x-2.5 cursor-pointer"
            >
              <PencilIcon className="w-4 text-tand-1 flex-none" />
              <span className="text-base text-tand-1 font-semibold flex-initial">
                Ubah
              </span>
            </div>
          </>
        )}
        {!isDetail && (
          <>
            <span className="text-base font-semibold text-tand-appr-1">
              {name}
            </span>
            <span className="text-base font-semibold text-tand-appr-1">
              <Link href={link ?? ""}>Lihat Detail</Link>
            </span>
          </>
        )}
      </div>
      <div className="w-full h-[1px] bg-[#EEEEEE] my-4" />
      <div className="flex flex-row">
        {data.map((item, index: number) => {
          return (
            <div key={index} className="flex flex-1 flex-col gap-y-1.5">
              <span className="text-xs font-normal text-tand-appr-2">
                {item.name}
              </span>
              <span className="text-sm font-medium text-tand-appr-1">
                {/* {ifemptyData(dataLahan, ["regencies", "name"], "")} */}
                {item.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CardPenjualan
