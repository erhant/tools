import { FC } from "react"
import { Helmet } from "react-helmet"
import Layout from "./components/layout"
import { tools } from "./constants/tools"
import Tool from "./components/tool"
import { Stack } from "@mantine/core"

const Home: FC = () => {
  return (
    <Layout>
      <Helmet>
        <head>Music Tools for Everyone</head>
        <meta name="description" content="Use these tools to practice your instrument!" />
      </Helmet>

      <Stack>
        {tools.map((tool) => (
          <Tool key={tool.path} tool={tool} />
        ))}
      </Stack>
    </Layout>
  )
}

export default Home
