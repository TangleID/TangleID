import {
  CALL_API,
  CHECK_TANGLE_USERS_REQUEST,
  CHECK_TANGLE_USERS_FAILURE,
  CHECK_TANGLE_USERS_SUCCESS,
} from '../constants';

// TODO: Verify is GET or POST
const checkTangleUsers = claims => ({
  [CALL_API]: {
    types: [
      CHECK_TANGLE_USERS_REQUEST,
      CHECK_TANGLE_USERS_SUCCESS,
      CHECK_TANGLE_USERS_FAILURE,
    ],
    method: 'GET',
    aggregate: true,
    getParams: () => claims.map(claim => ({
      body: {
        method: 'login',
        transactionid: claim.id,
      },
    })),
    labelFunc: p => ({ id: p.body.transactionid }),
    host: process.env.API_HOST,
    endpoint: '/proxy/',
  },
});

export default checkTangleUsers;
