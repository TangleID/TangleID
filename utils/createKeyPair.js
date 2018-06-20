const ursa = require('ursa');

module.exports = function createKeyPair() {
  const key = ursa.generatePrivateKey(2048);
  const sk = key.toPrivatePem('base64');
  const pk = key.toPublicPem('base64');
  return { sk, pk };
};
