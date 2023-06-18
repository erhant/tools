import { ReactNode } from "react"
import type { Icon } from "tabler-icons-react"

type ToolType = {
  path: string
  label: string
  element: ReactNode
  icon: Icon
  desc: string
}

export default ToolType
