import React from 'react'
import { HNProvider } from './store/hn'
import Page from './pages'

export const App = () => (
  <HNProvider>
    <Page />
  </HNProvider>
)

export default App
