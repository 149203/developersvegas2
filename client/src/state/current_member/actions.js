import { HAS_SIGNED_UP_FOR_MAILING_LIST } from '../types'

// Upsert member. This is called an action creator.
export const upsert_member = response => dispatch => {
   dispatch({
      type: HAS_SIGNED_UP_FOR_MAILING_LIST,
      payload: response,
   })
}
