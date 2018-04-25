const ursa = require('ursa')

module.exports = function createKeyPair() {
	const key = ursa.generatePrivateKey(1024)
	const sk = excludePadding('rsa private', key.toPrivatePem('base64'))
	const pk = excludePadding('public', key.toPublicPem('base64'))
	return { sk, pk }
}
