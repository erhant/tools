import { FC, useEffect, useMemo, useRef, useState } from "react"
import Layout from "./components/layout"
import { Helmet } from "react-helmet"
import { Title, Grid, TextInput, NativeSelect, Box, Text } from "@mantine/core"
import { formulaToIntervals, isValidFormula } from "./lib/formula"
import { MusicAccidental, MusicClef, MusicNote } from "./types/music"
import { drawStaffEffect } from "./lib/vexflow"
import { intervalsToNotes } from "./lib/interval"
import presetChords from "./constants/chords"
import presetIntervals from "./constants/intervals"

const STAFF_ELEM_ID = "formula-reader-staff"
const chordMapKeys = Object.keys(presetChords)
const intervalMapKeys = Object.keys(presetIntervals)

const FormulaReader: FC = () => {
  const staffRef = useRef<HTMLDivElement>(null)
  const [formula, setFormula] = useState("1-3-5")
  const [formulaInput, setFormulaInput] = useState("1-3-5")
  const [formulaIsValid, setFormulaIsValid] = useState(true)
  const [accidental, setAccidental] = useState<MusicAccidental>("#")
  const [clef, setClef] = useState<MusicClef>("bass")
  const [chordPreset, setChordPreset] = useState<string>(chordMapKeys[0])
  const [intervalPreset, setIntervalPreset] = useState<string>(intervalMapKeys[0])
  const [rootNote, setRootNote] = useState<MusicNote>("C")
  const intervals: number[] = useMemo(() => formulaToIntervals(formula), [formula])
  const intervalsDisplay: string = useMemo(
    () =>
      intervals
        .slice(1)
        .map((x) => x / 2)
        .join(" ")
        .toString()
        .replace(/0\.5/g, "½") // do this first to get account for 0s
        .replace(/\.5/g, "½"),
    [intervals]
  )
  const notes: MusicNote[] = useMemo(
    () => intervalsToNotes(intervals, rootNote, accidental),
    [intervals, rootNote, accidental]
  )

  // display notes in staff
  useEffect(drawStaffEffect(staffRef, notes, clef, rootNote), [notes, clef])

  return (
    <Layout>
      <Helmet>
        <head>Formula Reader</head>
        <meta name="description" content="Read the notes in a scale or chord by giving its formula!" />
      </Helmet>

      <Title>Formula Reader</Title>
      <Grid>
        <Grid.Col xs={5}>
          <TextInput
            placeholder="e.g. 1-b3-5"
            label="Formula"
            value={formulaInput}
            onChange={(event) => {
              const f = event.currentTarget.value
              const valid = isValidFormula(f)
              if (valid) setFormula(f)
              setFormulaInput(f)
              setFormulaIsValid(valid)
            }}
            error={formulaIsValid ? undefined : "Invalid formula."}
          />
        </Grid.Col>
        <Grid.Col xs={3}>
          <NativeSelect
            value={accidental}
            label="Accidentals"
            onChange={(event) => setAccidental(event.currentTarget.value as MusicAccidental)}
            data={["#", "b"]}
          />
        </Grid.Col>
        <Grid.Col xs={2}>
          <NativeSelect
            value={clef}
            label="Clef"
            onChange={(event) => setClef(event.currentTarget.value as MusicClef)}
            data={["bass", "treble"]}
          />
        </Grid.Col>
        <Grid.Col xs={2}>
          <NativeSelect
            placeholder="e.g. C"
            value={rootNote}
            label="Root"
            onChange={(event) => setRootNote(event.currentTarget.value as MusicNote)}
            data={["C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "B"]}
          />
        </Grid.Col>
        <Grid.Col xs={6}>
          <NativeSelect
            value={chordPreset}
            label="Chord Preset"
            onChange={(event) => {
              const f = event.currentTarget.value
              setChordPreset(f)
              setFormula(presetChords[f])
              setFormulaInput(presetChords[f])
            }}
            data={chordMapKeys}
          />
        </Grid.Col>
        <Grid.Col xs={6}>
          <NativeSelect
            value={intervalPreset}
            label="Interval Preset"
            onChange={(event) => {
              const f = event.currentTarget.value
              setIntervalPreset(f)
              setFormula(presetIntervals[f])
              setFormulaInput(presetIntervals[f])
            }}
            data={intervalMapKeys}
          />
        </Grid.Col>
      </Grid>

      {/* notes displayed as text */}
      <Box
        p="md"
        my="md"
        sx={{
          width: "100%",
          borderRadius: "62px",
          backgroundColor: "whitesmoke",
          textAlign: "center",
        }}
      >
        <Text sx={{ fontSize: "max(1.2em,calc(100vw/35))" }}>{notes.join(" ")}</Text>
        <Text>Intervals</Text>
        <Text sx={{ fontFamily: "monospace" }}>{intervalsDisplay}</Text>
      </Box>

      {/* notes displayed in clef */}
      <Box ref={staffRef} id={STAFF_ELEM_ID} className="staff" />
    </Layout>
  )
}

export default FormulaReader
