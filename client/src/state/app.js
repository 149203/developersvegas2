import { MAILING_LIST_SUCCESS } from './types'

// Action creators
export const store_mailing_list_success = () => dispatch => {
   dispatch({
      type: MAILING_LIST_SUCCESS,
   })
}

// Reducers
export function app(state = {}, action) {
   switch (action.type) {
      // will have different cases for action types
      case MAILING_LIST_SUCCESS:
         return {
            has_signed_up_for_mailing_list: true,
         }
      default:
         return state
   }
}
