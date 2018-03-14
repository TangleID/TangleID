import {
  CALL_API,
  FETCH_ACCOUNT_STORE_REQUEST,
  FETCH_ACCOUNT_STORE_FAILURE,
  FETCH_ACCOUNT_STORE_SUCCESS,
} from '../constants'

const fetchUserList = () => ({
  [CALL_API]: {
    types: [ FETCH_ACCOUNT_STORE_REQUEST, FETCH_ACCOUNT_STORE_SUCCESS, FETCH_ACCOUNT_STORE_FAILURE ],
    method: 'GET',
    host: process.env.HOST_API,
    endpoint: '/fetchUserList'
  }
})

export default fetchUserList
