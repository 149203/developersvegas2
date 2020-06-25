import { actions } from './types'

// Action creators
export const store_current_member = (payload) => (dispatch) => {
   dispatch({
      type: actions.UPDATE_CURRENT_MEMBER,
      payload,
   })
}

// Can comment out above

// Reducers
export function current_member(state = {}, action) {
   switch (action.type) {
      case actions.UPDATE_CURRENT_MEMBER:
         return action.payload
      case actions.UPDATE_CURRENT_MEMBER_AGE:
         return {
            ...state,
            age: action.payload,
         }
      default:
         return state
   }
}
