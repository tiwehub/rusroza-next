import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import 'dotenv/config';

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  }),
  cache: new InMemoryCache(),
});

export default client;
