import { combineReducers } from 'redux'
import { app } from './app' // The reducer itself returns an anonymous function. I name it here.
import { current_member } from './current_member'

export default combineReducers({
   app,
   current_member,
})
