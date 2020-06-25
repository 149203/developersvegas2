import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './state/root_reducer'

const middleware = [thunk]

// params: root reducer, initial state, middleware
const store = createStore(
   rootReducer,
   {}, // initial state, empty
   compose(
      applyMiddleware(...middleware),
      (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
         compose // https://github.com/zalmoxisus/redux-devtools-extension/issues/320#issuecomment-447914219
   )
)

export default store
