import {
  CALL_API,
  FETCH_MAM_MESSAGES_REQUEST,
  FETCH_MAM_MESSAGES_FAILURE,
  FETCH_MAM_MESSAGES_SUCCESS,
} from '../constants';

const fetchMamMessages = id => ({
  [CALL_API]: {
    types: [
      FETCH_MAM_MESSAGES_REQUEST,
      FETCH_MAM_MESSAGES_SUCCESS,
      FETCH_MAM_MESSAGES_FAILURE,
    ],
    method: 'POST',
    params: {
      body: {
        id,
      },
    },
    host: process.env.API_HOST,
    endpoint: '/mamFetch',
  },
});

export default fetchMamMessages;
