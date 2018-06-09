import {
  CALL_API,
  UPDATE_LOCAL_ACCOUNT_REQUEST,
  UPDATE_LOCAL_ACCOUNT_FAILURE,
  UPDATE_LOCAL_ACCOUNT_SUCCESS,
} from '../constants';

const updateLocalAccount = params => ({
  [CALL_API]: {
    types: [
      UPDATE_LOCAL_ACCOUNT_REQUEST,
      UPDATE_LOCAL_ACCOUNT_SUCCESS,
      UPDATE_LOCAL_ACCOUNT_FAILURE,
    ],
    method: 'POST',
    params: {
      body: params,
    },
    host: process.env.API_HOST,
    endpoint: '/updateLocalAccount',
  },
});

export default updateLocalAccount;
