import { ReactNode } from "react"
import { CurrencyEthereum, Icon, MathFunction, Music, Numbers, Playlist, Wiper } from "tabler-icons-react"
import FormulaReader from "../tools/Formula-Reader"
import RandomNotes from "../tools/Random-Notes"
import Metronome from "../tools/Metronome"
import ImpermanentLoss from "../tools/Impermanent-Loss"
import Collatz from "../tools/Collatz"
import Ethertools from "../tools/Ethereum"
import ToolType from "../types/tool"

export const tools: ToolType[] = [
  {
    path: "/formula-reader",
    label: "Formula Reader",
    desc: "Read a musical formula.",
    icon: Playlist,
    element: <FormulaReader />,
  },
  {
    path: "/random-notes",
    label: "Random Notes",
    icon: Music,
    desc: "A random note generator to practice scales & staff.",
    element: <RandomNotes />,
  },
  {
    path: "/metronome",
    label: "Metronome",
    icon: Wiper,
    desc: "A simple metronome",
    element: <Metronome />,
  },
  {
    path: "/impermenant-loss",
    label: "Impermenant Loss",
    icon: MathFunction,
    desc: "Calculate your impermanent loss in a constant product automated market maker.",
    element: <ImpermanentLoss />,
  },
  {
    path: "/collatz",
    label: "Collatz Sequence",
    icon: Numbers,
    desc: "Find the Collatz sequence of any positive integer.",
    element: <Collatz />,
  },
  {
    path: "/ethereum",
    label: "Ethereum",
    icon: CurrencyEthereum,
    desc: "A handful of Ethereum utilities such as unit conversion and hashing.",
    element: <Ethertools />,
  },
]
