/**
 * Create the store with asynchronously loaded reducers
 */
import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import createSagaMiddleware, {END} from 'redux-saga'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import rootSaga from './sagas'
import sagaMonitor from './sagaMonitor'
import createLogger from 'redux-logger'

import {persistStore, autoRehydrate} from 'redux-persist'

export default function configureStore(initialState = {}, history) {
  const sagaMiddleware = createSagaMiddleware({sagaMonitor})
  const devtools = window.devToolsExtension || (() => noop => noop)

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    thunk,
    sagaMiddleware,
    routerMiddleware(history),
  ]

  if (process.env.NODE_ENV === 'development') {
    //const logger = createLogger()
    //middlewares.push(logger)

  }

  const enhancers = [
    //autoRehydrate(),
    applyMiddleware(...middlewares),
    devtools(),
  ]

  const store = createStore(
    rootReducer,
    initialState,
    compose(...enhancers)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers') // eslint-disable-line
      store.replaceReducer(nextReducer.default)
    })

    module.hot.accept('sagas', () => {
      const rootSaga = require('sagas') // eslint-disable-line
      store.runSaga(rootSaga.default)
    })
  }

  // Initialize it with no other reducers
  store.asyncReducers = {}
  // Create hook for async sagas
  store.runSaga = sagaMiddleware.run
  store.runSaga(rootSaga)
  store.close = () => store.dispatch(END)

  //persistStore(store)
  return store
}
