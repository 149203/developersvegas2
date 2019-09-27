import { GET_ERRORS } from './types'

const initial_state = {} // the errors obj itself

// exports a function
export default function(state = initial_state, action) {
   switch (action.type) {
      // will have different cases for action types
      case GET_ERRORS:
         return { errors: action.payload }
      default:
         return state
   }
}
