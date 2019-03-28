import React, { Reducer, Dispatch } from 'react'
import { User, StoryKind, Stories } from '@/models/hn'
import { fetchStories } from '@/api/hn'

type State = {
  [kind: string]: Stories
}
const initialState: State = {}
interface Action {
  type: ActionTypes
  payload?: State
}

enum ActionTypes {
  SET = 'HN/STORIES/GET',
  CLEAR = 'HN/STORIES/CLEAR'
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
      return {
        ...state,
        ...payload
      }
    case ActionTypes.CLEAR:
      return initialState
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
  stories: State
  getStory: (kind: StoryKind) => Promise<void>
  clearStory: () => void
}

export const useHNStories = (): Store => {
  const { state, dispatch } = React.useContext(Context)
  const getStory: Store['getStory'] = async kind => {
    try {
      if (!kind || !dispatch) throw new Error('fetch stories error!')
      const story: Stories = await fetchStories({ kind })
      dispatch({
        type: ActionTypes.SET,
        payload: {
          [kind]: story
        }
      })
    } catch (err) {
      throw err
    }
  }
  const clearStory = () => {
    if (!dispatch) return
    dispatch({ type: ActionTypes.CLEAR })
  }
  return {
    stories: state,
    getStory,
    clearStory
  }
}
