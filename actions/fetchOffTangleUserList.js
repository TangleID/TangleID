import {
  CALL_API,
  OFF_TANGLE_USERS_REQUEST,
  OFF_TANGLE_USERS_FAILURE,
  OFF_TANGLE_USERS_SUCCESS,
} from '../constants';

const fetchOffTangleUserList = () => ({
  [CALL_API]: {
    types: [OFF_TANGLE_USERS_REQUEST, OFF_TANGLE_USERS_SUCCESS, OFF_TANGLE_USERS_FAILURE],
    host: process.env.OFF_TANGLE_USERS_LINK,
    endpoint: '/',
  },
});

export default fetchOffTangleUserList;
