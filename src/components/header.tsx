import { Anchor, Title } from "@mantine/core"
import type { FC } from "react"
import { Link } from "react-router-dom"

const Header: FC = () => {
  return (
    <header>
      <div>
        <div>
          <Anchor component={Link} to="/">
            <Title>Musical Tools</Title>
          </Anchor>
        </div>

        <Anchor href="https://github.com/erhant/musical-tools-for-everyone" target="_blank">
          <Title>GitHub</Title>
        </Anchor>
      </div>
    </header>
  )
}
export default Header
