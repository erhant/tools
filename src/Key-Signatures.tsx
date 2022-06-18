import { FC } from "react"
import Layout from "./components/layout"
import { Helmet } from "react-helmet"
import { Title } from "@mantine/core"

const KeySignatures: FC = () => {
  return (
    <Layout>
      <Helmet>
        <head>Key Signatures</head>
        <meta name="description" content="Try your knowledge on key signatures." />
      </Helmet>
      <Title>todo...</Title>
    </Layout>
  )
}

export default KeySignatures
