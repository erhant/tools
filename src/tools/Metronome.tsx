import { FC, useEffect, useRef, useState } from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { Button, Group, NumberInput, Title } from "@mantine/core"
import * as Tone from "tone"

// sounds taken from https://forum.cockos.com/showthread.php?t=39602]
const METRONOME_LOW = "/assets/metronome_low.wav"
const METRONOME_HIGH = "/assets/metronome_high.wav"
const Metronome: FC = () => {
  const [tempo, setTempo] = useState(90) // Tempo = Beats per Minute
  const [beats, setBeats] = useState(4) // Beats = Beats per Measure
  const count = useRef(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [players, setPlayers] = useState<{
    low: Tone.Player
    high: Tone.Player
  }>()

  useEffect(() => {
    if (!isPlaying || players == undefined) return

    const interval = setInterval(() => {
      // play sound
      if (count.current == 1) {
        players.high.start()
      } else {
        players.low.start()
      }

      // increment counter
      if (count.current == beats) {
        count.current = 1
      } else {
        count.current++
      }
    }, (60 / tempo) * 1000)

    return () => {
      clearInterval(interval)
      count.current = 1
    }
  }, [tempo, beats, isPlaying])

  // load ToneJs on mount
  useEffect(() => {
    Tone.start().then(() => {
      const p = {
        low: new Tone.Player(METRONOME_LOW).toDestination(),
        high: new Tone.Player(METRONOME_HIGH).toDestination(),
      }
      Tone.loaded().then(() => {
        setIsReady(true)
        setPlayers(p)
      })
    })
  }, [])
  return (
    <Layout>
      <Helmet>
        <head>Metronome</head>
        <meta name="description" content="A simple metronome." />
      </Helmet>
      <Title>Metronome</Title>
      <Group align="self-end" sx={{ position: "relative" }}>
        <NumberInput
          label="Tempo"
          value={tempo}
          onChange={(val) => val && setTempo(Math.round(val))}
          min={30}
          max={400}
          step={5}
        />
        <NumberInput
          label="Beats per Measure"
          value={beats}
          onChange={(val) => val && setBeats(Math.round(val))}
          min={1}
          max={16}
        />
        <Button disabled={!isReady} onClick={() => setIsPlaying((b) => !b)}>
          {isReady ? (isPlaying ? "Stop" : "Start") : "Loading..."}
        </Button>
      </Group>
    </Layout>
  )
}

export default Metronome
