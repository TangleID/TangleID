/** @module did */
const IdenityRegistry = require('./IdenityRegistry');

/**
 * Resolve the DID Document from the DID(Decentralized Identifier).
 * @method resolver
 * @param {String} did - The DID to be resolved.
 * @param {IdenityRegistry} registry - The registry used to maintain the identity.
 * @return {Promise} - Promise object represents the {@link https://w3c-ccg.github.io/did-spec/#did-documents DID Document}.
 */
const resolver = async (did, registry = new IdenityRegistry()) => {
  const document = await registry.fetch(did);

  return document;
};

module.exports = resolver;
