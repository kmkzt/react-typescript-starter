import * as React from 'react'

interface State {
  count: number
}
interface Action {
  type: ActionTypes
  param: any
}
enum ActionTypes {
  INCREMENT = 'increment',
  DECREMENT = 'decrement',
  RESET = 'reset'
}
export interface Store {
  state: State
  increment: () => void
  decrement: () => void
  reset: () => void
}
const initialState: State = {
  count: 0
}

const CounterContext = React.createContext({
  state: initialState,
  dispatch: undefined
})

const reducer = (
  state: State = initialState,
  { type, param }: Action
): State => {
  switch (type) {
    case ActionTypes.INCREMENT:
      return {
        ...state,
        count: state.count + 1
      }
    case ActionTypes.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      }
    case ActionTypes.RESET:
      return {
        ...state,
        count: 0
      }
    default:
      return state
  }
}

export const CounterProvider: React.SFC<{}> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { Provider } = CounterContext
  return (
    <Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </Provider>
  )
}

export const counterStore = (): Store => {
  const { state, dispatch } = React.useContext(CounterContext)
  const increment = () =>
    dispatch({
      type: ActionTypes.INCREMENT
    })
  const decrement = () =>
    dispatch({
      type: ActionTypes.DECREMENT
    })
  const reset = () =>
    dispatch({
      type: ActionTypes.RESET
    })
  return {
    state,
    increment,
    decrement,
    reset
  }
}
