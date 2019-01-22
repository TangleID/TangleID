/** @module did */
const tic = require('tic.api.js');

const { decodeFromDid } = require('./mnid');

const { getIota } = require('./providers');

/**
 * Resolve the DID Document from the DID(Decentralized Identifier).
 * @method resolver
 * @param {String} did - The DID to be resolved.
 * @return {Promise} - Promise object represents the {@link https://w3c-ccg.github.io/did-spec/#did-documents DID Document}.
 */
const resolver = async did => {
  const { network, address } = decodeFromDid(did);

  const channelRoots = await tic.getChannelRoots(address);

  const iota = getIota(network);
  const profile = await tic.profile.get(channelRoots.profile, iota);

  return profile;
};

module.exports = resolver;
