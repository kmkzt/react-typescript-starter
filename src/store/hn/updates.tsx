import React, { Reducer, Dispatch } from 'react'
import { User, Update } from '@/models/hn'
import { fetchUser, fetchUpdates } from '@/api/hn'

type State = Update | null
const initialState: State = null
interface Action {
  type: ActionTypes
  payload?: Update
}

enum ActionTypes {
  SET = 'HN/UPDATE/GET',
  CLEAR = 'HN/UPDATE/CLEAR'
}

const Context = React.createContext<{
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
    case ActionTypes.SET:
      if (!payload) return state
      if (state) {
        return payload
      }
    case ActionTypes.CLEAR:
      return null
    default:
      return state
  }
}

export const Provider: React.SFC<{}> = ({ children }) => {
  const [state, dispatch] = React.useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  )
  const { Provider } = Context
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

export interface Store {
  updates: State
  getUpdates: () => Promise<void>
  clearUpdates: () => void
}

export const connectUpdates = (): Store => {
  const { state, dispatch } = React.useContext(Context)
  const get: Store['getUpdates'] = async () => {
    try {
      if (!dispatch) throw new Error('fetch update error!')
      const payload: Update = await fetchUpdates()
      dispatch({
        type: ActionTypes.SET,
        payload
      })
    } catch (err) {
      throw err
    }
  }
  const clear = () => {
    if (!dispatch) return
    dispatch({ type: ActionTypes.CLEAR })
  }
  return {
    updates: state,
    getUpdates: get,
    clearUpdates: clear
  }
}
