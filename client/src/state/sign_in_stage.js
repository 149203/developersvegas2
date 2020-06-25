import { actions } from './types'

// Action creators
export const store_sign_in_stage = (payload) => (dispatch) => {
   dispatch({
      type: actions.UPDATE_SIGN_IN_STAGE,
      payload,
   })
}

// Can comment out above

// Reducers - the context of the state
export function sign_in_stage(state = {}, action) {
   switch (action.type) {
      case actions.UPDATE_SIGN_IN_STAGE:
         return action.payload
      default:
         return state
   }
}
