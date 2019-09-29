import { combineReducers } from 'redux'
import { app } from './app'
import { current_member } from './current_member'

export default combineReducers({
   app,
   current_member,
})
