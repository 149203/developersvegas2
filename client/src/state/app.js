import { HAS_SIGNED_UP_FOR_MAILING_LIST } from './types'

// Action creators
export const upsert_member = response => dispatch => {
   dispatch({
      type: HAS_SIGNED_UP_FOR_MAILING_LIST,
      payload: response,
   })
}

// Reducers
export function app(state = {}, action) {
   switch (action.type) {
      // will have different cases for action types
      case HAS_SIGNED_UP_FOR_MAILING_LIST:
         return {
            has_signed_up_for_mailing_list: true,
         }
      default:
         return state
   }
}
