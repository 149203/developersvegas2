import { MAILING_LIST_SUCCESS } from './types'

// Action creators
export const store_mailing_list_success = payload => dispatch => {
   dispatch({
      type: MAILING_LIST_SUCCESS,
      payload,
   })
}

// Reducers
export function app(state = {}, action) {
   switch (action.type) {
      case MAILING_LIST_SUCCESS:
         return {
            has_signed_up_for_mailing_list: action.payload,
         }
      default:
         return state
   }
}
