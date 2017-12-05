const ursa = require('ursa')


const excludePadding = (category, s) => {
	if (!category) throw new Error('Please specify public or private')
	const target=  category.toUpperCase()
	const begin = `-----BEGIN ${target} KEY-----`
	const end = `-----END ${target} KEY-----`
	return s.replace(begin, '')
		.replace(end, '')
		.trim()
}

module.exports = function createKeyPair() {
	const key = ursa.generatePrivateKey(1024)
	const sk = excludePadding('rsa private', key.toPrivatePem().toString())
	const pk = excludePadding('public', key.toPublicPem().toString())
	return { sk, pk }
}
