import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers' // don't have to list index.js, picks it up automatically because it's named index.js

const initial_state = {} // no initial state

const middleware = [thunk]

// params: root reducer, initial state, middleware
const store = createStore(
   rootReducer,
   initial_state,
   compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
         window.__REDUX_DEVTOOLS_EXTENSION__()
   )
)

export default store
