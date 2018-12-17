# get started

```
yarn
yarn dev
```

# Setup store by useContext & useReducer
[sample code](https://github.com/kamei-kazuto/react-typescript-starter/blob/master/src/store/counter.tsx)


1. SetUp Store

```tsx
const CounterContext = React.createContext({
  state: initialState,
  dispatch: undefined
})

export const ProviderCompoent: React.SFC<{}> = ({ children }) => {
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

```

2. Setup Provider 

```tsx
import { CounterProvider } from '@/store'

export const App = () => {
  return (
    <ProviderCompoent>
      <ConsumerComponent>
    </ProviderCompoent>
  )
}
```

3. component use stoer
  
```tsx
export const ConsumerComponent = (): Store => {
  const { state, dispatch } = React.useContext(CounterContext)
  return (
    <Component {...state} dispatch={dispatch} />
  )
}
```


#### Setup Async Function

```typescript
export const store = (): Store => {
  const { state, dispatch } = React.useContext(CounterContext)
  const fetchDate = async () => {
    const data = await fetch('url')
    dispatch({
      type: ActionTypes.SET
      param: {
        data
      }
    })
  }
  useEffect(()=> {
    if (state.loading) {
      fetchData()
    }
  }, []) 
    
  return {
    state,
    fetchData
  }
}
```

use component

```tsx
export const ItemList: React.SFC<{}> = () => {
  const {
    data
  } = counterStore()

  return (
    <ItemList item={data} />
  )
}

```
