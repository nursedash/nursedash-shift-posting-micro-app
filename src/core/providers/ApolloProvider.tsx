import React, {ReactNode} from 'react';
import {ApolloClient, DefaultOptions, InMemoryCache, ApolloProvider, ApolloLink, HttpLink} from "@apollo/client";
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { setContext } from '@apollo/client/link/context'

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




const getToken =():string=> {
  const token = localStorage.getItem('token') ?? '';
  return token !== '' ? `Bearer ${token}` : '';
}

const withToken = setContext(async () => {
  const token = getToken();
  return { headers: { Authorization: token } }
})

const link = ApolloLink.from([withToken, new HttpLink({
  uri,
})]);


const client =  new ApolloClient<{}>({
  link,
  cache: new InMemoryCache(),
  defaultOptions,
});

const ApolloGqlProvider = ({ children }: { children?: ReactNode }): ReactJSXElement => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )}

export { client };
export default ApolloGqlProvider;