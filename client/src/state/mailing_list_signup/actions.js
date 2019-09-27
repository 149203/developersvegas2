import axios from 'axios'
import { GET_ERRORS, HAS_SIGNED_UP_FOR_MAILING_LIST } from './types'

// Upsert member. This is called an action creator.
export const upsert_member = member_data => dispatch => {
   axios
      .post('/api/v1/members', member_data) // recall we put a PROXY value in our client package.json
      .then(res => {
         console.log(res.data)
         dispatch({
            type: HAS_SIGNED_UP_FOR_MAILING_LIST,
         })
      })
      .catch(err => {
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
         })
      })
}
