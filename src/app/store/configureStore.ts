import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import DevTools from '@/containers/DevTools'
import api from '../middleware'
import rootReducer from '../reducers'

const configureStore = (preloadedState?: any) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, api, createLogger()),
      DevTools.instrument(),
    ),
  )

  // if (import.meta.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   import.meta.hot.accept('../reducers', () => {
  //     store.replaceReducer(rootReducer)
  //   })
  // }

  return store
}

export default configureStore
