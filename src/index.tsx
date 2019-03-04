import React from 'react'
import ReactDOM from 'react-dom'
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

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
