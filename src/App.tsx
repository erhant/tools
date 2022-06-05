import { FC } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import FormulaReader from "./Formula-Reader"

import Home from "./Home"
import NotFound from "./NotFound"
import RandomNotes from "./Random-Notes"
import "./styles/global.scss"

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/formula-reader" element={<FormulaReader />} />
        <Route path="/random-notes" element={<RandomNotes />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
