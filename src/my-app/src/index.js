import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloLink, ApolloProvider, ApolloClient, InMemoryCache, Observable } from '@apollo/client';
import { Routes } from './Routes';

/*import { TokenRefreshLink } from "apollo-link-token-refresh";

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(operation => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`
              }
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
)*/

const cache = new InMemoryCache({});

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes/>
  </ApolloProvider>,
  document.getElementById('root')
);
