const tic = require('tic.api.js');

const { encodeToDid } = require('./mnid');
const { getTicClient } = require('./providers');

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
