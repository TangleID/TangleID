/**
 * Generate public keys from PEM-formatted public Keys.
 * @function generatePublicKeys
 * @param {string} controller - DID of the controller.
 * @param {string[]} publicKeyPems - PEM-formatted public Keys.
 * @returns {Object[]} Public keys
 */
const generatePublicKeys = (controller, publicKeyPems) => {
  if (controller === undefined) {
    throw new Error('controller is not specified');
  }

  if (publicKeyPems === undefined) {
    throw new Error('publicKeyPems is not specified');
  }

  return publicKeyPems.map((publicKeyPem, index) => ({
    id: `${controller}#keys-${index + 1}`,
    type: 'RsaVerificationKey2018',
    controller,
    publicKeyPem
  }));
};

module.exports = {
  generatePublicKeys
};
