import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
//import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createBrowserHistory as createHistory } from 'history'
import rootReducer from './modules'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]
let persistConfig = {
  key: 'root',
  storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

// export default createStore(
//   connectRouter(history)(rootReducer),
//   initialState,
//   composedEnhancers
// )

export default () => {
  let store = createStore(
    connectRouter(history)(persistedReducer),
    initialState,
    composedEnhancers
  )
  let persistor = persistStore(store)
  return { store, persistor }
}
