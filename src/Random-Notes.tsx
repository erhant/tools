import { FC, useEffect, useState } from 'react';
import Layout from './components/layout';
import {Helmet} from "react-helmet";
import { MusicNote } from './types/music';
import { getRandomNotes } from './lib/music';
import { Title, Group, NumberInput, Progress, Box, Text } from '@mantine/core';

const RandomNotes: FC = () => {
  const [intervalTime, setIntervalTime] = useState(2)
  const [counter, setCounter] = useState(0)
  const [notes, setNotes] = useState<MusicNote[]>(["C", "E", "G"])
  const [noteCount, setNoteCount] = useState<number>(3)

  useEffect(() => {
    setCounter(0)
    let interval = setInterval(() => {
      setNotes(getRandomNotes(noteCount))
    }, intervalTime * 1000)
    let counter = setInterval(() => setCounter((c) => (c + 0.5) % intervalTime), 500)
    return () => {
      clearInterval(interval)
      clearInterval(counter)
    }
  }, [intervalTime, noteCount])
  
  return (
    <Layout>
      <Helmet>
        <head>Random Music Notes</head>
        <meta name="description" content="Generate random notes for practice." />
      </Helmet>
      
      <Title>Random Music Notes</Title>
        <Group position="center">
          <NumberInput
            label="Time Interval (seconds)"
            value={intervalTime}
            onChange={(val) => val && setIntervalTime(val)}
            min={1}
            max={30}
          />
          <NumberInput
            label="Note Count"
            value={noteCount}
            onChange={(val) => val && setNoteCount(val)}
            min={1}
            max={12}
          />
        </Group>
        <Progress value={((counter + 0.5) / intervalTime) * 100} size="sm" my="md" />
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
        </Box>
    </Layout>
  );
}

export default RandomNotes;
