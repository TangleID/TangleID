import { combineReducers } from 'redux'

import {
	OFF_TANGLE_USERS_REQUEST,
	OFF_TANGLE_USERS_SUCCESS,
	OFF_TANGLE_USERS_FAILURE,
	CHECK_TANGLE_USERS_REQUEST,
	CHECK_TANGLE_USERS_SUCCESS,
	CHECK_TANGLE_USERS_FAILURE,
} from '../constants'

const isLoading = (state=false, action) => {
	switch (action.type) {
	case OFF_TANGLE_USERS_REQUEST:
	case CHECK_TANGLE_USERS_REQUEST:
		return true
	case OFF_TANGLE_USERS_SUCCESS:
	case OFF_TANGLE_USERS_FAILURE:
	case CHECK_TANGLE_USERS_SUCCESS:
	case CHECK_TANGLE_USERS_FAILURE:
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

const offTangleData = (state={}, action) => {
	switch (action.type) {
	case OFF_TANGLE_USERS_SUCCESS:
		return Object.keys(action.response)
			.map(id => action.response[id])
			.filter(c => c.id)
	default:
		return state
	}
}

const error = (state=null, action) => {
	switch (action.type) {
	case OFF_TANGLE_USERS_FAILURE:
	case CHECK_TANGLE_USERS_FAILURE:
		return action.error
	default:
		return state
	}
}

const reducer = combineReducers({
	offTangleData,
	validData,
	isLoading,
	error,
})

export default reducer
