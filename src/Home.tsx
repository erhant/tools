import { FC } from 'react';
import Layout from './components/layout';
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';
import { List, ListItem } from '@mantine/core';

const Home: FC = () => {
  return (
    <Layout>
      <Helmet>
        <head>Music Tools for Everyone</head>
        <meta name="description" content="Use these tools to practice your instrument!" />
      </Helmet>

      <List>
        <ListItem><Link to="/random-notes">
        Random Notes
      </Link></ListItem>
      <ListItem><Link to="/formula-reader">
        Formula Reader
      </Link></ListItem>
      </List>
      
    </Layout>
  );
}

export default Home;
