import snakeCase from 'lodash/snakeCase'
import {
	CALL_API,
	NEW_IDENTITY_REQUEST,
	NEW_IDENTITY_FAILURE,
	NEW_IDENTITY_SUCCESS,
} from '../constants'


const transformParams = (source) => {
	return Object.keys(source).reduce((acc, cur) => {
		const current = snakeCase(cur)
		acc[current] = source[cur]
		return acc
	}, {})
}

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
