import { Box, Text } from "@mantine/core"
import type { FC } from "react"

const Footer: FC = () => {
  return (
    <Box component="footer" py="md" sx={{ textAlign: "center" }}>
      <Text>&copy; Erhan Tezcan {new Date().getFullYear()} &nbsp; </Text>
    </Box>
  )
}

export default Footer
