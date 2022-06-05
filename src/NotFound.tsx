import { FC } from "react";
import Layout from "./components/layout";
import { Helmet } from "react-helmet";
import { Title } from "@mantine/core";

const NotFound: FC = () => {
  return (
    <Layout>
      <Helmet>
        <head>Not Found!</head>
        <meta
          name="description"
          content="You probably came here by mistake..."
        />
      </Helmet>
      <Title>I do not have that kind of tool yet!</Title>
    </Layout>
  );
};

export default NotFound;
