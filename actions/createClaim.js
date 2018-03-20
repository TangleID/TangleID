import { transformParams } from './_helper'
import {
	CALL_API,
	CREATE_CLAIM_REQUEST,
	CREATE_CLAIM_FAILURE,
	CREATE_CLAIM_SUCCESS,
} from '../constants'

const createClaim = (params) => ({
	[CALL_API]: {
		types: [
			CREATE_CLAIM_REQUEST,
			CREATE_CLAIM_SUCCESS,
			CREATE_CLAIM_FAILURE,
		],
		method: 'POST',
		params: {
			body: Object.assign(
				{ command: 'new_claim' },
				transformParams(params),
			)
		},
		labelFunc: (params) => ({
			id: params.body.uuid,
			message: params.body.msg,
		}),
		host: process.env.HOST_API,
		endpoint: '/proxy/'
	}
})

export default createClaim
