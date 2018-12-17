import * as React from 'react'
import { counterStore } from '@/store'
export interface Props {
  count: number
  increment?: () => void
  decrement?: () => void
  reset?: () => void
}

export const Component: React.SFC<Props> = ({
  count,
  increment,
  decrement,
  reset
}) => {
  const hancleClick = (action: () => void) => (
    e: React.MouseEvent<HTMLButtonElement>
  ) => action()
  return (
    <div>
      <h3>COUNTER</h3>
      <div>{count}</div>
      <button onClick={hancleClick(increment)}>+1</button>
      <button onClick={hancleClick(decrement)}>-1</button>
      <button onClick={hancleClick(reset)}>Reset</button>
    </div>
  )
}

export const Counter: React.SFC<{}> = () => {
  const {
    state: { count },
    increment,
    decrement,
    reset
  } = counterStore()

  return (
    <Component
      count={count}
      increment={increment}
      decrement={decrement}
      reset={reset}
    />
  )
}
