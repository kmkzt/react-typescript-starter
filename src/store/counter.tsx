import React, { Reducer, Dispatch } from 'react'

interface State {
  count: number
}
interface Action {
  type: ActionTypes
  payload?: any
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

const CounterContext = React.createContext<{
  state: State
  dispatch: Dispatch<Action> | null
}>({
  state: initialState,
  dispatch: null
})

const reducer = (
  state: State = initialState,
  { type, payload }: Action
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
  const [state, dispatch] = React.useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  )
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
    dispatch &&
    dispatch({
      type: ActionTypes.INCREMENT
    })
  const decrement = () =>
    dispatch &&
    dispatch({
      type: ActionTypes.DECREMENT
    })
  const reset = () =>
    dispatch &&
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
