import { ChevronDoubleDownIcon } from "@heroicons/react/solid";

export default function CardPagination({ onClick }: { onClick: () => void }) {
  return (
    <div className="my-4 text-tand-1">
      <div
        className="flex justify-center items-center gap-x-2 cursor-pointer"
        onClick={onClick}
      >
        <span>Lihat Selengkapnya</span>
        <ChevronDoubleDownIcon className="w-3 h-3 mr-2.5 text-tand-1" />
      </div>
    </div>
  )
}
