import fetch from 'isomorphic-unfetch'

let DEFAULT_HOST = process.env.HOST_API

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const fetchData = async function(
	host,
	endpoint,
	method='GET',
	body,
	label,
) {
	const fullUrl = (!host) ? DEFAULT_HOST + endpoint : host + endpoint
	const options = (method === 'GET') ? { method } :{ method, body: JSON.stringify(body), headers: {
		'Content-Type': 'application/json'
	}}

	const res = await fetch(fullUrl, options)
	if (!res.ok) return Promise.reject(res.statusText)

	const isJSON = (response) => response.headers.get('content-type').startsWith('application/json')
	let result
	if (isJSON(res)) {
		const json = await res.json()
		result = json
	} else {
		const text = await res.text()
		result = { text }
	}
	console.log('label', label)
	if (label) {
		result = Object.assign({}, result, label)
	}
	return Promise.resolve(result)
}

export default fetchData
