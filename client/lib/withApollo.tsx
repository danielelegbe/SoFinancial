import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
} from '@apollo/client';
import nextWithApollo from 'next-with-apollo';
import { useRouter } from 'next/router';
import { tokenRefreshLink, authLink, httpLink } from './links';

const withApollo = nextWithApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      ssrMode: typeof window === 'undefined',
      link: from([tokenRefreshLink, authLink, httpLink]),
      cache: new InMemoryCache().restore(initialState || {}),
      headers: {
        ...(headers as Record<string, string>),
      },
    });
  },
  {
    render: ({ Page, props }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} {...router} />
        </ApolloProvider>
      );
    },
  }
);

export default withApollo;
