import { ThemeIcon, MantineNumberSize, Sx } from "@mantine/core"
import { FC, MouseEventHandler } from "react"
import { Icon as TablerIcon } from "tabler-icons-react"

const Icon: FC<{
  I: TablerIcon
  onClick?: MouseEventHandler<HTMLDivElement>
  size?: MantineNumberSize
  sx?: Sx
}> = ({ I, onClick, size, sx }) => {
  return (
    <ThemeIcon onClick={onClick ? onClick : undefined} size={size ? size : "xl"}>
      <I />
    </ThemeIcon>
  )
}

export default Icon
