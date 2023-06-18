import { FC, ReactNode } from "react"
import Footer from "./footer"
import Header from "./header"
import { Container } from "@mantine/core"

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>
        <Container size="lg">{children}</Container>
      </main>
      <div style={{ flexGrow: 1 }} />
      <Footer />
    </div>
  )
}
export default Layout
