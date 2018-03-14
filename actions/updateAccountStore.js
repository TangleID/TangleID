import {
  CALL_API,
  UPDATE_ACCOUNT_STORE_REQUEST,
  UPDATE_ACCOUNT_STORE_FAILURE,
  UPDATE_ACCOUNT_STORE_SUCCESS,
} from '../constants'
import { transformParams } from './_helper'

const updateAccountStore = (params) => ({
  [CALL_API]: {
    types: [ UPDATE_ACCOUNT_STORE_REQUEST, UPDATE_ACCOUNT_STORE_SUCCESS, UPDATE_ACCOUNT_STORE_FAILURE ],
    method: 'POST',
    params: {
      body: params
    },
    host: process.env.HOST_API,
    endpoint: '/localStorageUpdate'
  }
})

export default updateAccountStore
