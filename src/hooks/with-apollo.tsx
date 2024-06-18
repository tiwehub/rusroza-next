import { ApolloProvider } from '@apollo/client';
import client from '@/libs/apollo-client';

const withApollo = (Component: any) => {
  return function ApolloComponent(props: any) {
    return (
      <ApolloProvider client={client}>
        <Component {...props} />
      </ApolloProvider>
    );
  };
};

export default withApollo;
