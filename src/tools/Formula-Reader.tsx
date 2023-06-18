import { FC, useEffect, useMemo, useRef, useState } from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { Title, Grid, TextInput, NativeSelect, Box, Text } from "@mantine/core"
import type { MusicAccidental, MusicClef, MusicNote, MusicPreparedNote } from "../types/music"
import { formulaToIntervals, isValidFormula } from "../lib/music/formula"
import { drawStaff } from "../lib/music/vexflow"
import { prepareNotes } from "../lib/music/base"
import { intervalsToNotes } from "../lib/music/interval"
import presetChords from "../constants/music/chords"
import presetIntervals from "../constants/music/intervals"

const STAFF_ELEM_ID = "formula-reader-staff"
const chordMapKeys = Object.keys(presetChords)
const intervalMapKeys = Object.keys(presetIntervals)
const DEFAULT_CLEF: MusicClef = "bass"
const DEFAULT_FORMULA = "1-3-5"
const DEFAULT_NOTES: MusicNote[] = ["C", "E", "G"]

const FormulaReader: FC = () => {
  const staffRef = useRef<HTMLDivElement>(null)
  const [formula, setFormula] = useState(DEFAULT_FORMULA)
  const [formulaInput, setFormulaInput] = useState(DEFAULT_FORMULA)
  const [formulaIsValid, setFormulaIsValid] = useState(true)
  const [accidental, setAccidental] = useState<MusicAccidental>("#")
  const [clef, setClef] = useState<MusicClef>(DEFAULT_CLEF)
  const [preparedNotes, setPreparedNotes] = useState<MusicPreparedNote[]>(prepareNotes(DEFAULT_NOTES, DEFAULT_CLEF))
  const [chordPreset, setChordPreset] = useState<string>(chordMapKeys[0])
  const [intervalPreset, setIntervalPreset] = useState<string>(intervalMapKeys[0])
  const [rootNote, setRootNote] = useState<MusicNote>(DEFAULT_NOTES[0])
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
  useEffect(() => {
    const ctx = drawStaff(staffRef, preparedNotes, clef, rootNote)

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
