import { CardProps } from "@/interfaces/CardProp"
import Button from "../fields/Button"
import { useRouter } from "next/navigation"

const Card: React.FC<CardProps> = ({ id, name, data }) => {
  const router = useRouter()
  return (
    <div className="flex flex-col p-6 bg-white shadow-main-4 rounded-[12px]">
      <div className="flex flex-row justify-between">
        <span className="text-base font-semibold text-tand-appr-1">
          {/* {ifemptyData(dataLahan, ["name"], "")} */}
          {name}
        </span>
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
        <Button
          buttonType="primary"
          label="Lihat Dashboard"
          disabled={false}
          className="ml-auto px-4"
          width="auto"
          onClick={() => router.push(`/dashboard?farmer_land_id=${id}`)}
        />
      </div>
    </div>
  )
}

export default Card
