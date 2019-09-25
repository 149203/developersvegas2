// our root reducer

import { combineReducers } from 'redux'
import error_reducer from './error_reducer'
import signup_reducer from './signup_reducer'

export default combineReducers({
   signup: signup_reducer,
   errors: error_reducer,
})
