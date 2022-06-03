import { FC } from 'react';
import Layout from './components/layout';
import {Helmet} from "react-helmet";

const NotFound: FC = () => {
  return (
    <Layout>
      <Helmet>
        <head>Not Found!</head>
        <meta name="description" content="You probably came here by mistake..." />
      </Helmet>
      helllo
    </Layout>
  );
}

export default NotFound;
