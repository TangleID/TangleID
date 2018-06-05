import {
  CALL_API,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
} from '../constants';

const Login = uuid => ({
  [CALL_API]: {
    types: [
      LOGIN_REQUEST,
      LOGIN_SUCCESS,
      LOGIN_FAILURE,
    ],
    method: 'POST',
    params: {
      body: Object.assign({ command: 'login', uuid }),
    },
    host: process.env.HOST_API,
    endpoint: '/proxy/',
  },
});

export default Login;
