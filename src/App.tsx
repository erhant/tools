import { FC } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import FormulaReader from "./Formula-Reader"

import Home from "./Home"
import KeySignatures from "./Key-Signatures"
import NotFound from "./NotFound"
import Metronome from "./Metronome"
import RandomNotes from "./Random-Notes"
import "./styles/global.scss"

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/formula-reader" element={<FormulaReader />} />
        <Route path="/random-notes" element={<RandomNotes />} />
        <Route path="/metronome" element={<Metronome />} />
        <Route path="/key-signatures" element={<KeySignatures />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
