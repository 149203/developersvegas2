import { GET_ERRORS, HAS_SIGNED_UP_FOR_MAILING_LIST } from './types'

const initial_state = {} // the errors obj itself

// exports a function
export default function(state = initial_state, action) {
   switch (action.type) {
      // will have different cases for action types
      case GET_ERRORS:
         return { errors: action.payload }
      case HAS_SIGNED_UP_FOR_MAILING_LIST:
         return { has_signed_up_for_mailing_list: true, errors: {} }
      default:
         return state
   }
}
