/** @module did */
const tic = require('tic.api.js');

const { encodeToDid } = require('./mnid');
const { getTicClient } = require('./providers');

/**
 * Register the TangleID DID(Decentralized Identifier) on the IOTA/Tangle.
 * @method register
 * @param {String} seed - The seed for the master channel.
 * @param {String} network - The network identitfer. Mainnet: '0x1', Testnet: '0x2'.
 * @return {Promise} Promise object represents the register result.
 */
const register = async (seed, network) => {
  const ticClient = await getTicClient(network, seed);
  const did = encodeToDid({ network, address: ticClient.masterRoot });

  const document = {
    '@context': 'https://w3id.org/did/v1',
    id: did
  };
  await tic.profile.putInfo(ticClient.profile, document);

  return {
    did: did,
    masterRoot: ticClient.masterRoot,
    password: ticClient.password,
    profileRoot: ticClient.profile.channelRoot,
    contactsRoot: ticClient.contacts.channelRoot
  };
};

module.exports = register;
