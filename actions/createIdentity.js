import {
  CALL_API,
  NEW_IDENTITY_REQUEST,
  NEW_IDENTITY_FAILURE,
  NEW_IDENTITY_SUCCESS,
} from '../constants';

const createNewIdentity = param => ({
  [CALL_API]: {
    types: [NEW_IDENTITY_REQUEST, NEW_IDENTITY_SUCCESS, NEW_IDENTITY_FAILURE],
    method: 'POST',
    params: {
      // body: Object.assign({ command: 'new_user' }, transformParams(param))
      body: param,
    },
    host: process.env.API_HOST,
    /* temporary workaround */
    endpoint: '/createIdentity',
    // endpoint: '/proxy/'
  },
});

export default createNewIdentity;
