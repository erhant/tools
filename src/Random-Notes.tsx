import { FC, useEffect, useRef, useState } from "react"
import Layout from "./components/layout"
import { Helmet } from "react-helmet"
import { MusicClef, MusicNote } from "./types/music"
import { getRandomNotes } from "./lib/base"
import { Title, NumberInput, Progress, Box, Text, NativeSelect, Grid } from "@mantine/core"
import { drawStaffEffect } from "./lib/vexflow"

const STAFF_ELEM_ID = "random-notes-staff"
const DEFAULT_NOTES: MusicNote[] = ["C", "E", "G"]

const RandomNotes: FC = () => {
  const staffRef = useRef<HTMLDivElement>(null)
  const [intervalTime, setIntervalTime] = useState(2)
  const [counter, setCounter] = useState(0)
  const [notes, setNotes] = useState<MusicNote[]>(DEFAULT_NOTES)
  const [clef, setClef] = useState<MusicClef>("bass")
  const [noteCount, setNoteCount] = useState<number>(DEFAULT_NOTES.length)

  useEffect(() => {
    setCounter(0)
    const interval = setInterval(() => {
      setNotes(getRandomNotes(noteCount))
    }, intervalTime * 1000)
    const counter = setInterval(
      () => setCounter((c) => (c + intervalTime / noteCount) % intervalTime),
      1000 * (intervalTime / noteCount)
    )
    return () => {
      clearInterval(interval)
      clearInterval(counter)
    }
  }, [intervalTime, noteCount])

  // display notes in staff
  useEffect(drawStaffEffect(staffRef, notes, clef, "C"), [notes])

  return (
    <Layout>
      <Helmet>
        <head>Random Notes</head>
        <meta name="description" content="Generate random notes for practice." />
      </Helmet>

      <Title>Random Music Notes</Title>
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
          <NumberInput label="Notes" value={noteCount} onChange={(val) => val && setNoteCount(val)} min={1} max={12} />
        </Grid.Col>
        <Grid.Col xs={4} md={2}>
          <NativeSelect
            value={clef}
            label="Clef"
            onChange={(event) => setClef(event.currentTarget.value as MusicClef)}
            data={["bass", "treble"]}
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
    </Layout>
  )
}

export default RandomNotes
