import {
  CALL_API,
  RSA_KEY_PAIRS_REQUEST,
  RSA_KEY_PAIRS_FAILURE,
  RSA_KEY_PAIRS_SUCCESS,
} from '../constants';

// TODO: Verify is GET or POST
const fetchKeyPairs = () => ({
  [CALL_API]: {
    types: [RSA_KEY_PAIRS_REQUEST, RSA_KEY_PAIRS_SUCCESS, RSA_KEY_PAIRS_FAILURE],
    method: 'GET',
    host: process.env.API_HOST,
    endpoint: '/keyPairs',
  },
});

export default fetchKeyPairs;
