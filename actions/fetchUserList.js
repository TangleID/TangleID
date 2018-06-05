import {
  CALL_API,
  FETCH_LOCAL_ACCOUNT_REQUEST,
  FETCH_LOCAL_ACCOUNT_FAILURE,
  FETCH_LOCAL_ACCOUNT_SUCCESS,
} from '../constants';

const fetchUserList = () => ({
  [CALL_API]: {
    types: [FETCH_LOCAL_ACCOUNT_REQUEST, FETCH_LOCAL_ACCOUNT_SUCCESS, FETCH_LOCAL_ACCOUNT_FAILURE],
    method: 'GET',
    host: process.env.HOST_API,
    endpoint: '/fetchUserList',
  },
});

export default fetchUserList;
