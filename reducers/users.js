import { combineReducers } from 'redux'

import {
	OFF_TANGLE_USERS_REQUEST,
	OFF_TANGLE_USERS_SUCCESS,
	OFF_TANGLE_USERS_FAILURE,
	CHECK_TANGLE_USERS_REQUEST,
	CHECK_TANGLE_USERS_SUCCESS,
	CHECK_TANGLE_USERS_FAILURE,
	RSA_KEY_PAIRS_REQUEST,
	RSA_KEY_PAIRS_SUCCESS,
	RSA_KEY_PAIRS_FAILURE,
	NEW_IDENTITY_REQUEST,
	NEW_IDENTITY_SUCCESS,
	NEW_IDENTITY_FAILURE,
	FETCH_CLAIMS_REQUEST,
	FETCH_CLAIMS_FAILURE,
	FETCH_CLAIMS_SUCCESS,
	CREATE_CLAIM_REQUEST,
	CREATE_CLAIM_FAILURE,
	CREATE_CLAIM_SUCCESS,
        SHOW_CLAIM_REQUEST,
        SHOW_CLAIM_FAILURE,
        SHOW_CLAIM_SUCCESS,
} from '../constants'

const keyPairs = (state={}, action) => {
	switch (action.type) {
	case RSA_KEY_PAIRS_SUCCESS:
		return action.response
	default:
		return state
	}
}

const isLoading = (state=false, action) => {
	switch (action.type) {
	case CREATE_CLAIM_REQUEST:
	case NEW_IDENTITY_REQUEST:
	case FETCH_CLAIMS_REQUEST:
	case RSA_KEY_PAIRS_REQUEST:
	case OFF_TANGLE_USERS_REQUEST:
	case CHECK_TANGLE_USERS_REQUEST:
	case SHOW_CLAIM_REQUEST:
		return true
	case OFF_TANGLE_USERS_SUCCESS:
	case OFF_TANGLE_USERS_FAILURE:
	case RSA_KEY_PAIRS_SUCCESS:
	case RSA_KEY_PAIRS_FAILURE:
	case CHECK_TANGLE_USERS_SUCCESS:
	case CHECK_TANGLE_USERS_FAILURE:
	case NEW_IDENTITY_SUCCESS:
	case NEW_IDENTITY_FAILURE:
	case FETCH_CLAIMS_SUCCESS:
	case FETCH_CLAIMS_FAILURE:
	case CREATE_CLAIM_SUCCESS:
	case CREATE_CLAIM_FAILURE:
	case SHOW_CLAIM_FAILURE:
	case SHOW_CLAIM_SUCCESS:
		return false
	default:
		return state
	}
}

const validData = (state=[], action) => {
	switch (action.type) {
	case CHECK_TANGLE_USERS_SUCCESS:
		return action.response
	default:
		return state
	}
}

const offTangleData = (state=[], action) => {
	switch (action.type) {
	case OFF_TANGLE_USERS_SUCCESS:
		return Object.keys(action.response)
			.map(id => action.response[id])
			.filter(c => c.id)
			.map((user) => {
				user.claim = JSON.parse(user.claim)
				return user
			})
	default:
		return state
	}
}

const error = (state=null, action) => {
	switch (action.type) {
	case RSA_KEY_PAIRS_FAILURE:
	case OFF_TANGLE_USERS_FAILURE:
	case CHECK_TANGLE_USERS_FAILURE:
	case FETCH_CLAIMS_FAILURE:
	case CREATE_CLAIM_FAILURE:
	case SHOW_CLAIM_FAILURE:
		return action.error
	default:
		return state
	}
}

const claims = (state=[], action) => {
	switch (action.type) {
	case CREATE_CLAIM_SUCCESS:
	case FETCH_CLAIMS_SUCCESS:
	case SHOW_CLAIM_SUCCESS:
		return [].concat(state, action.response)
	default:
		return state
	}
}

const reducer = combineReducers({
	keyPairs,
	offTangleData,
	validData,
	isLoading,
	claims,
	error,
})

export default reducer
