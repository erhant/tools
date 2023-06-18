import { Anchor, Box, Container, Title } from "@mantine/core"
import type { FC } from "react"
import { Link } from "react-router-dom"

const Header: FC = () => {
  return (
    <Box component="header" p="lg">
      <Container size="lg">
        <Anchor component={Link} to="/">
          <Title>Tools</Title>
        </Anchor>

        {/* empty space in between left and right*/}
        <Box sx={{ flexGrow: 1 }} />

        <Anchor href="https://github.com/erhant/musical-tools-for-everyone" target="_blank">
          <Title>GitHub</Title>
        </Anchor>
      </Container>
    </Box>
  )
}

export default Header
