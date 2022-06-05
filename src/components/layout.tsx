import { FC, ReactNode } from "react"
import Footer from "./footer"
import Header from "./header"

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <div />
      <Footer />
    </div>
  )
}
export default Layout
