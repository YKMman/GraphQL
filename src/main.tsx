import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import App from './App.tsx'
import { githubAPI, githubToken } from './lib/constants.ts'


const cache = new InMemoryCache({})

const client = new ApolloClient({
  uri: githubAPI,
  cache: cache,
  headers: {
    Authorization: `Bearer ${githubToken}`
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
