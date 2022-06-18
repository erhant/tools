import { FC } from "react"
import Layout from "./components/layout"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import { Anchor, Title } from "@mantine/core"

const Home: FC = () => {
  return (
    <Layout>
      <Helmet>
        <head>Music Tools for Everyone</head>
        <meta name="description" content="Use these tools to practice your instrument!" />
      </Helmet>

      <Anchor component={Link} to="/random-notes">
        <Title>Random Notes</Title>
      </Anchor>

      <Anchor component={Link} to="/formula-reader">
        <Title>Formula Reader</Title>
      </Anchor>

      <Anchor component={Link} to="/metronome">
        <Title>Metronome</Title>
      </Anchor>

      <Anchor component={Link} to="/key-signatures">
        <Title>Key Signatures</Title>
      </Anchor>
    </Layout>
  )
}

export default Home
