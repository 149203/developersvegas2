import { createStore, applyMiddleware, compose } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import rootReducer from './state/root_reducer'

const initial_state = {} // no initial state

const middleware = [thunk]

// params: root reducer, initial state, middleware
const store = createStore(
   rootReducer,
   initial_state,
   compose(
      applyMiddleware(...middleware),
      (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
         compose
   )
)

export default store
