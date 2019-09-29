import { UPDATE_CURRENT_MEMBER } from './types'

// Action creators
export const store_current_member = payload => dispatch => {
   dispatch({
      type: UPDATE_CURRENT_MEMBER,
      payload,
   })
}

// Reducers
export function current_member(state = {}, action) {
   switch (action.type) {
      // will have different cases for action types
      case UPDATE_CURRENT_MEMBER:
         return action.payload
      default:
         return state
   }
}
