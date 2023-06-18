import { FC } from "react"
import { Helmet } from "react-helmet"
import Layout from "./components/layout"
import { tools } from "./constants/tools"
import Tool from "./components/tool"

const Home: FC = () => {
  return (
    <Layout>
      <Helmet>
        <head>Music Tools for Everyone</head>
        <meta name="description" content="Use these tools to practice your instrument!" />
      </Helmet>
      {tools.map((tool) => (
        <Tool key={tool.path} tool={tool} />
      ))}
    </Layout>
  )
}

export default Home
