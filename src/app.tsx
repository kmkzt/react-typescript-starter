import React from 'react'
import { HNProvider } from './store/hn'
import Page from './pages'
import { BrowserRouter } from 'react-router-dom'

export const App = () => {
  return (
    <HNProvider>
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    </HNProvider>
  )
}
