import { ApolloClient } from '@apollo/client';

import cache from './cache';

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_SERVER_URL}/graphql`,
  cache,
});

export default client;
