import { combineReducers } from 'redux'
import app from './app/reducers' // The reducer itself returns an anonymous function. I name it here.
import current_member from './current_member/reducers'

export default combineReducers({
   app,
   current_member,
})
