import React, {ReactNode} from 'react';
import {ApolloClient, DefaultOptions, InMemoryCache, ApolloProvider} from "@apollo/client";
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

const uri = process.env.REACT_APP_NURSEDASH_API_URL ?? '';
const fetchPolicy = 'no-cache';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy,
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy,
    errorPolicy: 'all',
  },
}

const token= localStorage.getItem('token') ?? '';
const client =  new ApolloClient<{}>({
  uri,
  cache: new InMemoryCache(),
  defaultOptions,
  headers: {
    Authorization: token !== '' ? `Bearer ${token}` : '',
  }
});

const ApolloGqlProvider = ({ children }: { children?: ReactNode }): ReactJSXElement => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )}

export { client };
export default ApolloGqlProvider;