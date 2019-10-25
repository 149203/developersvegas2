import { UPDATE_PAST_EVENTS } from './types'

// Action creators
export const store_past_events = payload => dispatch => {
   dispatch({
      type: UPDATE_PAST_EVENTS,
      payload,
   })
}

// Reducers
export function past_events(state = {}, action) {
   switch (action.type) {
      case UPDATE_PAST_EVENTS:
         return action.payload
      default:
         return state
   }
}
