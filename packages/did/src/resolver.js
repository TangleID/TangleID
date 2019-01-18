const tic = require('tic.api.js');

const { decodeFromDid } = require('./mnid');

const { getIota } = require('./providers');

const resolver = async did => {
  const { network, address } = decodeFromDid(did);

  const channelRoots = await tic.getChannelRoots(address);

  const iota = getIota(network);
  const profile = await tic.profile.get(channelRoots.profile, iota);

  return profile;
};

module.exports = resolver;
