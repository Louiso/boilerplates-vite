import { ApolloClient } from '@apollo/client';

import cache from './cache';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache,
});

export default client;
