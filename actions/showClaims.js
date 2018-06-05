import {
  CALL_API,
  SHOW_CLAIM_REQUEST,
  SHOW_CLAIM_FAILURE,
  SHOW_CLAIM_SUCCESS,
} from '../constants';

const showClaims = uuid =>
  ({

    [CALL_API]: {
      types: [
        SHOW_CLAIM_REQUEST,
        SHOW_CLAIM_SUCCESS,
        SHOW_CLAIM_FAILURE,
      ],
      method: 'POST',
      params: {
        body: {
          command: 'get_claim_info',
          hash_txn: uuid,
        },
      },
      host: process.env.HOST_API,
      endpoint: '/proxy/',
    },
  });


export default showClaims;

