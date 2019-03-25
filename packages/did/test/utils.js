const forge = require('node-forge');

/**
 * Generate RSA key pairs.
 * @function generateKeyPair
 * @param {object} [options] - Generate key pair options.
 * @param {number} [bits] - Key length of key pair.
 */
const generateKeyPair = ({ bits = 1024 } = {}) => {
  const keypair = forge.rsa.generateKeyPair({ bits });
  const publicKey = forge.pki.publicKeyToPem(keypair.publicKey);
  const privateKey = forge.pki.privateKeyToPem(keypair.privateKey);

  return {
    publicKey,
    privateKey
  };
};

module.exports = {
  generateKeyPair
};
