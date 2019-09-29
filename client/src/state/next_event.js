import { UPDATE_NEXT_EVENT } from './types'

// Action creators
export const store_next_event = payload => dispatch => {
   dispatch({
      type: UPDATE_NEXT_EVENT,
      payload,
   })
}

// Reducers
export function next_event(state = {}, action) {
   switch (action.type) {
      case UPDATE_NEXT_EVENT:
         return action.payload
      default:
         return state
   }
}
