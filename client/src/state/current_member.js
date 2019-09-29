import { HAS_SIGNED_UP_FOR_MAILING_LIST } from './types'

// Action creators
export const upsert_member = response => dispatch => {
   dispatch({
      type: HAS_SIGNED_UP_FOR_MAILING_LIST,
      payload: response,
   })
}

// Reducers
export function current_member(state = {}, action) {
   switch (action.type) {
      // will have different cases for action types
      case HAS_SIGNED_UP_FOR_MAILING_LIST:
         return action.payload
      default:
         return state
   }
}
