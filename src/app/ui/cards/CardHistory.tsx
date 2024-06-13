import { CardProps } from "@/interfaces/CardProp"
import Link from "next/link"

const CardHistory: React.FC<CardProps> = ({
  link,
  name,
  data,
  isDetail,
  onClick,
}) => {
  return (
    <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
      <div
        className={`flex flex-row justify-between`}
      >
        <span>{name}</span>
        {!isDetail && (
          <span className="text-base font-semibold text-tand-appr-1">
            <Link href={link ?? ""}>Lihat Detail</Link>
          </span>
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
                {item.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CardHistory
