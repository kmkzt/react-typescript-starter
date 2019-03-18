import React from 'react'
import { HNProvider } from './store/hn'
import { Page } from './pages'

export const App = () => {
  return (
    <HNProvider>
      <Page />
    </HNProvider>
  )
}
