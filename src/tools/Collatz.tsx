import Layout from "../components/layout"
import { Title, Text, NumberInput, Anchor, Button, Group } from "@mantine/core"
import { FC, useState } from "react"
import { Helmet } from "react-helmet"

function collatzSequence(n: number): number[] {
  const ans: number[] = []
  while (n > 1) {
    ans.push(n)
    if ((n & 1) === 0) {
      n >>= 1
    } else {
      n = 3 * n + 1
    }
  }
  ans.push(1)
  return ans
}

const defaultNum = 7

const Collatz: FC = () => {
  const [num, setNum] = useState<number>(defaultNum)
  const [seq, setSeq] = useState<number[]>(collatzSequence(defaultNum))

  return (
    <>
      <Helmet>
        <title>Collatz Sequence</title>
        <meta name="description" content="Collatz Sequence finder tool." key="desc" />
      </Helmet>

      <Layout>
        <>
          <Title order={1} my="md">
            Collatz Sequence Finder
          </Title>
          <Text my="md">
            The <Anchor href="https://en.wikipedia.org/wiki/Collatz_conjecture">Collatz Conjecture</Anchor> is a
            conjecture stating that if you pick any positive integer, and recursively divide it by 2 if even or multiply
            by 3 and add 1 if odd, you will reach 1 at the end. The Collatz Sequence of a number is the set of numbers
            that appear until the iterative process reaches one.
          </Text>
          <Group>
            <NumberInput
              min={1}
              step={1}
              placeholder={"Number"}
              onChange={(val: number) => {
                // can be undefined if empty, so make this check
                if (val) setNum(val)
              }}
            />
            <Button variant="outline" onClick={() => setSeq(collatzSequence(num))}>
              Find
            </Button>
          </Group>

          <Title order={3} my="md">
            Sequence
          </Title>
          <Text>{seq.join(" → ")}</Text>
          <Text color="dimmed">{seq.length - 1} steps</Text>

          <Title order={3} my="md">
            Reduced Sequence
          </Title>
          <Text>{seq.filter((n) => n & 1).join(" → ")}</Text>
          <Text color="dimmed">{seq.filter((n) => n & 1).length - 1} steps, even numbers omitted.</Text>
        </>
      </Layout>
    </>
  )
}

export default Collatz
