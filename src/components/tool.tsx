import { Anchor, Box, Group, Stack } from "@mantine/core"
import { FC } from "react"
import ToolType from "../types/tool"
import Icon from "./icon"
import { Link } from "react-router-dom"

const Tool: FC<{
  tool: ToolType
}> = ({ tool: { desc, icon, label, path } }) => {
  return (
    <Stack px="sm">
      <Group position="left">
        <Icon I={icon} />
        <Anchor component={Link} to={path} sx={{ fontSize: "1.5em" }}>
          {label}
        </Anchor>
      </Group>
      <Box sx={{ marginTop: "-1em" }}>{desc}</Box>
    </Stack>
  )
}

export default Tool
