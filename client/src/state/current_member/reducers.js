import { HAS_SIGNED_UP_FOR_MAILING_LIST } from '../types'

const initial_state = {}

// exports a function
export default function(state = initial_state, action) {
   switch (action.type) {
      // will have different cases for action types
      case HAS_SIGNED_UP_FOR_MAILING_LIST:
         return action.payload
      default:
         return state
   }
}
