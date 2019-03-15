import React from 'react'
import { Counter } from '@/components/Counter'
import { CounterProvider } from '@/store'

export const App = () => {
  return (
    <CounterProvider>
      <div>
        <Counter />
        <Counter />
      </div>
    </CounterProvider>
  )
}
