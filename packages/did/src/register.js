/** @module did */
const IdenityRegistry = require('./IdenityRegistry');

/**
 * Register the TangleID DID(Decentralized Identifier) on the IOTA/Tangle.
 * @method register
 * @param {String} seed - The seed for the master channel.
 * @param {String} network - The network identitfer.
 * @param {IdenityRegistry} registry - The registry used to maintain the identity.
 * @return {Promise} Promise object represents the register result.
 */
const register = async (seed, network, registry = new IdenityRegistry()) => {
  const { did, document } = await registry.publish(network, seed);
  return {
    did,
    seed,
    document
  };
};

module.exports = register;
