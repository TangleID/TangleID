import { CALL_API } from '../constants'
import fetchData from './fetchData'

export default store => next => action => {
	const callAPI = action[CALL_API]
	if (typeof callAPI === 'undefined') {
		return next(action)
	}

	let { endpoint } = callAPI

	const {
		types, params, method, host,
		aggregate, getParams,
	} = callAPI

	if (typeof endpoint !== 'string') {
		throw new Error('Specify a string endpoint URL.')
	}

	if (!Array.isArray(types) || types.length !== 3) {
		throw new Error('Expected an array of three action types: [REQUEST, SUCCESS, FAILURE]')
	}
	if (!types.every(type => typeof type === 'string')) {
		throw new Error('Expected action types to be strings.')
	}

	const actionWith = data => {
		const finalAction = Object.assign({}, action, data)
		delete finalAction[CALL_API]
		return finalAction
	}

	const [ requestType, successType, failureType ] = types
	next(actionWith({ type: requestType }))


	let promise

	function getPromise(p, label) {
		if (!p) {
			return fetchData(host, endpoint, 'GET')
		}
		return fetchData(host, endpoint, method, p.body, label)
	}

	if (aggregate) {
		const paramsList = getParams()
		promise = Promise.all(paramsList.map((p) => {
			return getPromise(p, { id: p.body.transactionid})
		}))
			.then(res => {
				return res
			})
	} else {
		promise = getPromise(params)
	}

	return promise.then(
		response => {
			next(actionWith({
				response,
				type: successType
			}))
		},
		error => next(actionWith({
			type: failureType,
			error: error.message || 'Something bad happened'
		}))
	)
}

