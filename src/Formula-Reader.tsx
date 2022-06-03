import { FC, useMemo, useState } from 'react';
import Layout from './components/layout';
import {Helmet} from "react-helmet";
import { Title, Grid, TextInput, NativeSelect, Box, Text } from '@mantine/core';
import { formulaToIntervals, intervalsToNotes, isValidFormula } from './lib/music';
import { MusicAccidental, MusicNote } from './types/music';

const FormulaReader: FC = () => {
  const [formula, setFormula] = useState("1-3-5")
  const [formulaInput, setFormulaInput] = useState("1-3-5")
  const [formulaIsValid, setFormulaIsValid] = useState(true)
  const [accidental, setAccidental] = useState<MusicAccidental>("#")
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

  return (
    <Layout>
      <Helmet>
        <head>Formula Reader</head>
        <meta name="description" content="Read the notes in a scale or chord by giving its formula!" />
      </Helmet>
      
      <Title>Music Formula Reader</Title>
        <Grid>
          <Grid.Col xs={12} sm={6}>
            <TextInput
              placeholder="e.g. 1-b3-5"
              label="Formula"
              value={formulaInput}
              onChange={(event) => {
                const f = event.currentTarget.value
                const valid = isValidFormula(f)
                if (valid) setFormula(event.currentTarget.value)
                setFormulaInput(f)
                setFormulaIsValid(valid)
              }}
              error={formulaIsValid ? undefined : "Invalid formula."}
            />
          </Grid.Col>
          <Grid.Col xs={6} sm={3}>
            <NativeSelect
              placeholder="(b) flat or (#) sharp"
              value={accidental}
              label="Accidentals"
              onChange={(event) => setAccidental(event.currentTarget.value as MusicAccidental)}
              data={["#", "b"]}
            />
          </Grid.Col>
          <Grid.Col xs={6} sm={3}>
            <NativeSelect
              placeholder="e.g. C"
              value={rootNote}
              label="Root"
              onChange={(event) => setRootNote(event.currentTarget.value as MusicNote)}
              data={["C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "B"]}
            />
          </Grid.Col>
        </Grid>

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
          <Text sx={{ fontSize: "calc(100vw/15)" }}>{notes.join(" ")}</Text>
          <Text>Intervals</Text>
          <Text sx={{ fontFamily: "monospace" }}>{intervalsDisplay}</Text>
        </Box>
    </Layout>
  );
}

export default FormulaReader;
