import React, { Reducer, Dispatch } from 'react'
import { Item } from '@/models/hn'
import { fetchItem } from '@/api/hn'

type State = Item[] | null
const initialState: State = null
interface Action {
  type: ActionTypes
  payload?: Item
}

enum ActionTypes {
  SET = 'HN/ITEM/GET',
  CLEAR = 'HN/ITEM/CLEAR'
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
  items: State
  getItem: (id: number) => Promise<void>
  clearItem: () => void
}

export const connectItem = (): Store => {
  const { state, dispatch } = React.useContext(Context)
  const getItem: Store['getItem'] = async id => {
    try {
      if (!id || !dispatch) throw new Error('fetch item error!')
      const payload: Item = await fetchItem({ id })
      dispatch({
        type: ActionTypes.SET,
        payload
      })
    } catch (err) {
      throw err
    }
  }
  const clearItem = () => {
    if (!dispatch) return
    dispatch({ type: ActionTypes.CLEAR })
  }
  return {
    items: state,
    getItem,
    clearItem
  }
}
