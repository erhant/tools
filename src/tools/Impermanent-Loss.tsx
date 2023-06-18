// Collatz sequence tool
import Layout from "../components/layout"
import { Title, Text, NumberInput, Stack, Group, Anchor, Blockquote, Divider, Code } from "@mantine/core"
import { Helmet } from "react-helmet"
import { FC, useState } from "react"
import { CurrencyDollar } from "tabler-icons-react"

const MIN = 0.01
const STEP = 0.05
const PRECISION = 2
const ICONSIZE = 18

type PoolType = {
  spotA: number // Spot price of Token A
  qtyA: number // Quantity of Token A, w.r.t liq
  spotB: number // Spot price of Token B
  qtyB: number // Quantity of Token B, w.r.t liq
  futureA: number // Future price of Token A
  futureB: number // Future price of Token B
  liq: number // Liquidity of one Token. Assumes we provide the same amount for both.
}
const INIT_PRICE = 0.5
const INIT_LIQ = 500
const defaultTokenVals: PoolType = {
  spotA: INIT_PRICE,
  qtyA: INIT_LIQ / INIT_PRICE,
  spotB: INIT_PRICE,
  qtyB: INIT_LIQ / INIT_PRICE,
  futureA: INIT_PRICE,
  futureB: INIT_PRICE,
  liq: INIT_LIQ,
}

const ImpermanentLoss: FC = () => {
  const [tokenVals, setTokenVals] = useState<PoolType>(defaultTokenVals)

  const results = (() => {
    const spot_ratio = tokenVals.spotA / tokenVals.spotB
    const future_ratio = tokenVals.futureA / tokenVals.futureB
    const ratio_change = spot_ratio / future_ratio

    const qtyA_new = tokenVals.qtyA * Math.sqrt(ratio_change)
    const qtyB_new = tokenVals.qtyB / Math.sqrt(ratio_change)
    const hodl = tokenVals.qtyA * tokenVals.futureA + tokenVals.qtyB * tokenVals.futureB
    const lp = qtyA_new * tokenVals.futureA + qtyB_new * tokenVals.futureB

    return {
      qtyA_new: qtyA_new,
      qtyB_new: qtyB_new,
      hodl,
      lp,
      diff: hodl - lp,
    }
  })()

  return (
    <Layout>
      <Helmet>
        <title>Impermanent Loss Calculator</title>
        <meta name="description" content="An impermanent loss calculator." key="desc" />
      </Helmet>
      <Title order={1} my="md">
        Impermanent Loss Calculator
      </Title>

      <Stack>
        <Group>
          <NumberInput
            precision={PRECISION}
            min={MIN}
            step={STEP}
            label="Token A - Spot Price"
            placeholder={defaultTokenVals.spotA + ""}
            onChange={(val: number) => {
              if (val) setTokenVals({ ...tokenVals, spotA: val, qtyA: tokenVals.liq / val })
            }}
            value={tokenVals.spotA}
            icon={<CurrencyDollar size={ICONSIZE} />}
          />
          <NumberInput
            precision={PRECISION}
            min={MIN}
            step={STEP}
            placeholder={defaultTokenVals.spotB + ""}
            label="Token B - Spot Price"
            onChange={(val: number) => {
              if (val) setTokenVals({ ...tokenVals, spotB: val, qtyB: tokenVals.liq / val })
            }}
            value={tokenVals.spotB}
            icon={<CurrencyDollar size={ICONSIZE} />}
          />
        </Group>
        <Group>
          <NumberInput
            precision={PRECISION}
            min={MIN}
            step={STEP}
            placeholder={defaultTokenVals.futureA + ""}
            label="Token A - Future Price"
            onChange={(val: number) => {
              if (val) setTokenVals({ ...tokenVals, futureA: val })
            }}
            value={tokenVals.futureA}
            icon={<CurrencyDollar size={ICONSIZE} />}
          />
          <NumberInput
            precision={PRECISION}
            min={MIN}
            step={STEP}
            placeholder={defaultTokenVals.futureB + ""}
            label="Token B - Future Price"
            onChange={(val: number) => {
              if (val) setTokenVals({ ...tokenVals, futureB: val })
            }}
            value={tokenVals.futureB}
            icon={<CurrencyDollar size={ICONSIZE} />}
          />
        </Group>
        <Group>
          <NumberInput
            min={1}
            step={1}
            placeholder={defaultTokenVals.liq + ""}
            label="Liquidity of each token"
            description={"Total value in the pool: " + tokenVals.liq * 2}
            onChange={(val: number) => {
              if (val)
                setTokenVals((tokenVals) => ({
                  ...tokenVals,
                  liq: val,
                  qtyA: val / (tokenVals.liq / tokenVals.qtyA),
                  qtyB: val / (tokenVals.liq / tokenVals.qtyB),
                }))
            }}
            value={tokenVals.liq}
            icon={<CurrencyDollar size={ICONSIZE} />}
          />
        </Group>
        <Text color="dimmed">No fees are included in this calculator!</Text>
      </Stack>

      <Title order={4} mt="md">
        Initial
      </Title>
      <Text>
        You had {tokenVals.liq * 2}$ worth of tokens at the spot price: <br />
        <ul>
          <li>
            {tokenVals.liq}$ worth of Token A with {tokenVals.qtyA.toFixed(2)} tokens
          </li>
          <li>
            {tokenVals.liq}$ worth of Token B with {tokenVals.qtyB.toFixed(2)} tokens
          </li>
        </ul>
      </Text>

      <Title order={4} mt="md">
        HODLer
      </Title>
      <Text>
        If you had kept on to these tokens you would have:
        <ul>
          <li>
            {(tokenVals.qtyA * tokenVals.futureA).toFixed(2)}$ worth of Token A with {tokenVals.qtyA.toFixed(2)} tokens
          </li>
          <li>
            {(tokenVals.qtyB * tokenVals.futureB).toFixed(2)}$ worth of Token B with {tokenVals.qtyB.toFixed(2)} tokens
          </li>
        </ul>
        at a total value of {results.hodl.toFixed(2)}$.
      </Text>
      <Title order={4} mt="md">
        Liquidity Provider
      </Title>
      <Text>
        If you had these assets in a pool, the pool constant would be {tokenVals.qtyA * tokenVals.qtyB}. At the spot
        price, the ratio is 50:50 as it should be. When the prices change, arbitrage traders will buy the outperforming
        one, and sell the underperforming one to balance the price. As a result, there will be:
        <ul>
          <li>
            {(results.qtyA_new * tokenVals.futureA).toFixed(2)}$ worth of Token A with {results.qtyA_new.toFixed(2)}{" "}
            tokens
          </li>
          <li>
            {(results.qtyB_new * tokenVals.futureB).toFixed(2)}$ worth of Token B with {results.qtyB_new.toFixed(2)}{" "}
            tokens
          </li>
        </ul>
        at a total value of {results.lp.toFixed(2)}$.
        <br />
        <br />
        Had you HODLed, you would have {results.diff.toFixed(2)}$ more.{" "}
        <b>Your impermanent loss is {((100 * results.diff) / results.hodl).toFixed(2)}%.</b>
      </Text>

      <Title mt="lg">What is impermanent loss?</Title>
      <Text>
        <Blockquote
          cite={
            <Anchor href="https://arxiv.org/pdf/2111.09192.pdf">
              - Loesch et al. &quot;Impermanent Loss in Uniswap v3&quot; (Nov 2021)
            </Anchor>
          }
        >
          Impermanent Loss is the difference between the value of the current fee adjusted liquidity position in an
          Automated Market Maker (AMM), and the HODL value of the position that was originally contributed.
        </Blockquote>
        Traditional AMMs use constant product <code>k = m * n</code> where <code>k</code> is the pool constant,{" "}
        <code>m</code> and <code>n</code> are the pool constituents, measured in quantities.
      </Text>
      <br />
      <Text>
        Assuming the AMM is arbitraged, the dollar value of two assets are always equal (i.e 50:50 ratio). Consequently,
        an AMM will always sell the outperforming asset and buy the underperforming asset. This is the source of
        impermanent loss, as a normal person would keep the outperforming asset (because it is increasing in price)
        whereas the AMM will sell it. Same but vice versa for the underperforming asset.
      </Text>
      <br />
      <Text>
        To calculate the new quantities, we do as follows:
        <pre>
          {`
spot_ratio = spotA / spotB
future_ratio = futureA / futureB
ratio_change = spot_ratio / future_ratio
qtyA_new = qtyA * sqrt(ratio_change)
qtyB_new = qtyB / sqrt(ratio_change)
            `}
        </pre>
        With these new quantities, we calculate our gains with respect to the future prices, as if we are withdrawing
        the assets from the pool. Then, we look at the difference between our gains from this and HODLing, giving our
        impermanent loss.
      </Text>
      <Text color="dimmed" mt="md">
        This tool was inspired from that of{" "}
        <Anchor href="https://dailydefi.org/tools/impermanent-loss-calculator/">dailydefi.org's</Anchor>.
      </Text>
    </Layout>
  )
}

export default ImpermanentLoss
