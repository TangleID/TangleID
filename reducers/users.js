import { combineReducers } from 'redux';

import {
  OFF_TANGLE_USERS_REQUEST,
  OFF_TANGLE_USERS_SUCCESS,
  OFF_TANGLE_USERS_FAILURE,
  CREATE_CLAIM_REQUEST,
  CREATE_CLAIM_FAILURE,
  CREATE_CLAIM_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  UPDATE_LOCAL_ACCOUNT_REQUEST,
  UPDATE_LOCAL_ACCOUNT_FAILURE,
  UPDATE_LOCAL_ACCOUNT_SUCCESS,
  CLOSE_LOGIN_DIALOG,
} from '../constants';

const isLoading = (state = false, action) => {
  switch (action.type) {
    case CREATE_CLAIM_REQUEST:
    case OFF_TANGLE_USERS_REQUEST:
    case LOGIN_REQUEST:
    case UPDATE_LOCAL_ACCOUNT_REQUEST:
      return true;
    case OFF_TANGLE_USERS_SUCCESS:
    case OFF_TANGLE_USERS_FAILURE:
    case CREATE_CLAIM_SUCCESS:
    case CREATE_CLAIM_FAILURE:
    case LOGIN_FAILURE:
    case LOGIN_SUCCESS:
    case UPDATE_LOCAL_ACCOUNT_FAILURE:
    case UPDATE_LOCAL_ACCOUNT_SUCCESS:
      return false;
    default:
      return state;
  }
};

const offTangleData = (state = [], action) => {
  switch (action.type) {
    case OFF_TANGLE_USERS_SUCCESS:
      return Object.keys(action.response)
        .map(id => action.response[id])
        .filter(c => c.id)
        .map((user) => {
          user.claim = JSON.parse(user.claim);
          return user;
        });
    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case OFF_TANGLE_USERS_FAILURE:
    case CREATE_CLAIM_FAILURE:
    case LOGIN_FAILURE:
    case UPDATE_LOCAL_ACCOUNT_FAILURE:
      return action.error;
    default:
      return state;
  }
};

const claims = (state = [], action) => {
  switch (action.type) {
    case CREATE_CLAIM_SUCCESS:
      return [].concat(state, action.response);
    default:
      return state;
  }
};

const isRegister = (state = false, action) => {
  switch (action.type) {
    case CLOSE_LOGIN_DIALOG:
      return false;
    default:
      return state;
  }
};

const isLogin = (state = false, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return true;
    case LOGIN_FAILURE:
      return false;
    default:
      return state;
  }
};

const reducer = combineReducers({
  offTangleData,
  isLoading,
  claims,
  error,
  isRegister,
  isLogin,
});

export default reducer;
