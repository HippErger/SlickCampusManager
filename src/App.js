import React, { Component } from 'react';
import './App.css';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import SlicknodeLink from 'slicknode-apollo-link';
// import 'isomorphic-fetch'; // Add isomorphic fetch if fetch is not available in your environment (NodeJS)
import gql from 'graphql-tag';

// Replace with your Slicknode endpoint 
const SLICKNODE_ENDPOINT = 'https://campus-manager-slick2-5f6b9a40.us-east1.slicknode.com';

const slicknodeLink = new SlicknodeLink({
  debug: true // Writes auth debug info to console, disable in production
});

const client = new ApolloClient({
  link: ApolloLink.from([
    slicknodeLink,
    // Error link to show errors in console (optional)
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors && console) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }

      if (networkError && console) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    // Network link to make HTTP requests to the API
    new HttpLink({
      uri: SLICKNODE_ENDPOINT,
      credentials: 'same-origin',
    })
  ]),
  cache: new InMemoryCache()
});

client.query({
  query: gql`
    {
      viewer {
        user {
          email
        }
      }
    }
  `
})
    .then(result => console.log(result))
    .catch(err => console.error(err.message));

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
            href="https://campus-manager-slick2-5f6b9a40.us-east1.slicknode.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Our End Point
          </a>
        </header>
      </div>
    );
  }
}

export default App;
