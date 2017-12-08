import {
	CALL_API,
	FETCH_CLAIMS_REQUEST,
	FETCH_CLAIMS_FAILURE,
	FETCH_CLAIMS_SUCCESS,
} from '../constants'

const fetchClaims = (uuid) => ({
	[CALL_API]: {
		types: [
			FETCH_CLAIMS_REQUEST,
			FETCH_CLAIMS_SUCCESS,
			FETCH_CLAIMS_FAILURE,
		],
		method: 'POST',
		params: {
			body: {
				command: 'get_all_claims',
				uuid
			},
		},
		host: process.env.HOST_API,
		endpoint: '/proxy/'
	}
})

export default fetchClaims
