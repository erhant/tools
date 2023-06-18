import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotFound from "./404"
import type { FC } from "react"
import { tools } from "./constants/tools"
import Home from "./Home"
import "./styles/global.scss"

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {tools.map(({ path, element }) => (
          <Route path={path} element={element} key={path} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
