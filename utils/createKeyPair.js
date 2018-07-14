const forge = require('node-forge');

module.exports = function createKeyPair() {
  const rsa = forge.pki.rsa;
  const keypair = rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
  const pk = forge.pki.publicKeyToPem(keypair.publicKey);
  const sk = forge.pki.privateKeyToPem(keypair.privateKey);
  return { sk, pk };
};
