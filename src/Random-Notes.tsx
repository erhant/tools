import { FC, useCallback, useEffect, useRef, useState } from "react"
import Layout from "./components/layout"
import { Helmet } from "react-helmet"
import { MusicClef, MusicNote, MusicPreparedNote } from "./types/music"
import { getRandomNotes, prepareNotes } from "./lib/base"
import { Title, NumberInput, Progress, Box, Text, NativeSelect, Grid, Button, Center } from "@mantine/core"
import { drawStaff } from "./lib/vexflow"
import * as Tone from "tone"

const STAFF_ELEM_ID = "random-notes-staff"
const DEFAULT_NOTES: MusicNote[] = ["C#", "E", "G#"]
const DEFAULT_CLEF: MusicClef = "bass"

const RandomNotes: FC = () => {
  const staffRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [intervalTime, setIntervalTime] = useState(2)
  const [counter, setCounter] = useState(0)
  const [player, setPlayer] = useState<Tone.Synth>()
  const playerIndex = useRef(0)
  const [notes, setNotes] = useState<MusicNote[]>(DEFAULT_NOTES)
  const [preparedNotes, setPreparedNotes] = useState<MusicPreparedNote[]>(prepareNotes(DEFAULT_NOTES, DEFAULT_CLEF))
  const [clef, setClef] = useState<MusicClef>(DEFAULT_CLEF)
  const [noteCount, setNoteCount] = useState<number>(DEFAULT_NOTES.length)
  const playNote = useCallback(() => {
    if (!player) return
    player.triggerAttackRelease(
      preparedNotes[playerIndex.current].note + preparedNotes[playerIndex.current].octave,
      "16n"
    )
    playerIndex.current++
    if (playerIndex.current == noteCount) playerIndex.current = 0
  }, [preparedNotes, counter, player])

  useEffect(() => {
    if (!isReady) return

    // interval to re-generate notes
    const noteGenerationInterval = setInterval(() => {
      setNotes(getRandomNotes(noteCount))
    }, intervalTime * 1000)

    // interval for the on-screen counter + playing notes
    const noteCounterInterval = setInterval(() => {
      setCounter((c) => (c + intervalTime / noteCount) % intervalTime)
      playNote()
    }, 1000 * (intervalTime / noteCount))

    // cleanups
    return () => {
      clearInterval(noteGenerationInterval)
      clearInterval(noteCounterInterval)
      setCounter(0)
      playerIndex.current = 0
    }
  }, [intervalTime, noteCount])

  // display notes in staff
  useEffect(() => {
    const ctx = drawStaff(staffRef, preparedNotes, clef, "C")

    return () => {
      if (ctx) ctx.restore()
    }
  }, [preparedNotes])

  useEffect(() => {
    setPreparedNotes(prepareNotes(notes, clef))
  }, [notes, clef])

  return (
    <Layout>
      <Helmet>
        <head>Random Notes</head>
        <meta name="description" content="Generate random notes for practice." />
      </Helmet>

      <Title>Random Music Notes</Title>
      {isReady ? (
        <>
          <Grid align="center" justify="center">
            <Grid.Col xs={4} md={2}>
              <NumberInput
                label="Time"
                value={intervalTime}
                onChange={(val) => val && setIntervalTime(val)}
                min={1}
                max={30}
              />
            </Grid.Col>
            <Grid.Col xs={4} md={2}>
              <NumberInput
                label="Notes"
                value={noteCount}
                onChange={(val) => val && setNoteCount(val)}
                min={1}
                max={12}
              />
            </Grid.Col>
            <Grid.Col xs={4} md={2}>
              <NativeSelect
                value={clef}
                label="Clef"
                onChange={(event) => setClef(event.currentTarget.value as MusicClef)}
                data={["bass", "treble", "alto", "tenor"]}
              />
            </Grid.Col>
          </Grid>
          <Progress value={((counter + intervalTime / noteCount) / intervalTime) * 100} size="sm" my="md" />

          {/* notes displayed as text */}
          <Box
            p="md"
            my="md"
            sx={{
              width: "80%",
              borderRadius: "62px",
              backgroundColor: "whitesmoke",
              textAlign: "center",
              margin: "auto",
            }}
          >
            <Text sx={{ fontSize: "max(1.2em,calc(100vw/35))" }}>{notes.join(" ")}</Text>
          </Box>

          {/* notes displayed in clef */}
          <Box ref={staffRef} id={STAFF_ELEM_ID} className="staff" />
        </>
      ) : (
        <>
          <Text>todo todo</Text>
          <Button
            onClick={() => {
              Tone.start().then(() => {
                const p = new Tone.Synth().toDestination()
                Tone.loaded().then(() => {
                  setIsReady(true)
                  setPlayer(p)
                })
              })
            }}
          >
            Begin
          </Button>
        </>
      )}
    </Layout>
  )
}

export default RandomNotes
