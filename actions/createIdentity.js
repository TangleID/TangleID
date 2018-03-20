import { transformParams } from './_helper'
import {
	CALL_API,
	NEW_IDENTITY_REQUEST,
	NEW_IDENTITY_FAILURE,
	NEW_IDENTITY_SUCCESS,
} from '../constants'

const createNewIdentity = (params) => ({
	[CALL_API]: {
		types: [ NEW_IDENTITY_REQUEST, NEW_IDENTITY_SUCCESS, NEW_IDENTITY_FAILURE ],
		method: 'POST',
		params: {
			body: Object.assign({ command: 'new_user' }, transformParams(params))
		},
		host: process.env.HOST_API,
		endpoint: '/proxy/'
	}
})

export default createNewIdentity
