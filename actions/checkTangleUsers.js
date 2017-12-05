import {
	CALL_API,
	CHECK_TANGLE_USERS_REQUEST,
	CHECK_TANGLE_USERS_FAILURE,
	CHECK_TANGLE_USERS_SUCCESS,
} from '../constants'

// TODO: Verify is GET or POST
const checkTangleUsers = (claims) => ({
	[CALL_API]: {
		types: [CHECK_TANGLE_USERS_REQUEST, CHECK_TANGLE_USERS_SUCCESS, CHECK_TANGLE_USERS_FAILURE],
		method: 'GET',
		aggregate: true,
		getParams: () => claims.map((claim) => ({
			body: {
				method: 'login',
				transactionid: claim.id,
			}
		})),
		host: process.env.HOST_API,
		endpoint: '/'
	}
})

export default checkTangleUsers
