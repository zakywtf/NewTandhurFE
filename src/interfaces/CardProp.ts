export type CardData = {
  name: string
  value: string
}

export type CardProps = {
  id?: string
  name: string
  data: CardData[]
  isDetail?: false | boolean
  link?: string
  onClick?: () => void
}

export type CardPanenProps = {
  isStop?: boolean
  handleStop?: () => void
} & CardProps
