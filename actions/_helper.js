import snakeCase from 'lodash/snakeCase'

export const transformParams = (source) => {
	return Object.keys(source).reduce((acc, cur) => {
		const current = snakeCase(cur)
		acc[current] = source[cur]
		return acc
	}, {})
}
