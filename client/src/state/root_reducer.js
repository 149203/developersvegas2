import { combineReducers } from 'redux'
import { app } from './app'
import { current_member } from './current_member'
import { next_event } from './next_event'
import { past_events } from './past_events'

export default combineReducers({
   app,
   current_member,
   next_event,
   past_events,
})
