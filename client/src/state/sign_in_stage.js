import { UPDATE_SIGN_IN_STAGE } from './types'

// Action creators
export const store_sign_in_stage = payload => dispatch => {
   dispatch({
      type: UPDATE_SIGN_IN_STAGE,
      payload,
   })
}

// Reducers
export function sign_in_stage(state = {}, action) {
   switch (action.type) {
      case UPDATE_SIGN_IN_STAGE:
         return action.payload
      default:
         return state
   }
}
