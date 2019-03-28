import React, { Reducer, Dispatch } from 'react'
import { User } from '@/models/hn'
import { fetchUser } from '@/api/hn'

type State = User[] | null
const initialState: State = null
interface Action {
  type: ActionTypes
  payload?: User
}

enum ActionTypes {
  SET = 'HN/USER/GET',
  CLEAR = 'HN/USER/CLEAR'
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
        return [...state, payload]
      }
      return [payload]
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
  users: State
  getUser: (id: string) => Promise<void>
  clearUser: () => void
}

export const useHNUser = (): Store => {
  const { state, dispatch } = React.useContext(Context)
  const getUser: Store['getUser'] = async id => {
    try {
      if (!id || !dispatch) throw new Error('fetch user error!')
      const payload: User = await fetchUser({ id })
      dispatch({
        type: ActionTypes.SET,
        payload
      })
    } catch (err) {
      throw err
    }
  }
  const clearUser = () => {
    if (!dispatch) return
    dispatch({ type: ActionTypes.CLEAR })
  }
  return {
    users: state,
    getUser,
    clearUser
  }
}
