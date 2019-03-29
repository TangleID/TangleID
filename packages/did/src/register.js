/** @module did */
const mamClient = require('mam.tools.js');
const IdenityRegistry = require('./IdenityRegistry');

/**
 * Register the TangleID DID(Decentralized Identifier) on the IOTA/Tangle.
 * @method register
 * @param {Object} [options] Registration options
 * @param {string} [options.seed = mamClient.generateSeed()] - The seed for the master channel.
 * @param {string} [options.network = 0x1] - The network identitfer.
 * @param {String|string[]} [options.publicKey = []] - PEM-formatted public Key.
 * @param {IdenityRegistry} [options.registry = new IdenityRegistry()] - The registry used to maintain the identity.
 * @return {Promise} Promise object represents the register result.
 */
const register = async ({
  seed = mamClient.generateSeed(),
  network = '0x1',
  publicKey = [],
  registry = new IdenityRegistry()
}) => {
  const publicKeys = Array.isArray(publicKey) ? publicKey : [publicKey];
  const { did, document } = await registry.publish(network, seed, publicKeys);
  return {
    did,
    seed,
    document
  };
};

module.exports = register;
