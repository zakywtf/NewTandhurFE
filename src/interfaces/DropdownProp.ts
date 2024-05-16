export interface DropdownData {
  id: string
  name: string
}

export interface DropdownProp {
  items: DropdownData[]
  onChange: (value: DropdownData) => void
}
