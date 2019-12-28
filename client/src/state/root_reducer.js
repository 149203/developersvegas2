import { combineReducers } from 'redux'
import { app } from './app'
import { current_member } from './current_member'
import { next_event } from './next_event'
import { sign_in_stage } from './sign_in_stage'

export default combineReducers({
   app,
   current_member,
   next_event,
   sign_in_stage,
})
