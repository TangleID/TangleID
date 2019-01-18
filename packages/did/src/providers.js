const tic = require('tic.api.js');
const mamClient = require('mam.tools.js');

const providers = {
  // Mainnet
  '0x1': 'http://node.deviceproof.org:14265',
  // Testnet
  '0x2': 'http://node.deviceproof.org:14266'
};

const getProviders = () => {
  return providers;
};

const setProvider = (networkId, provider) => {
  providers[networkId] = provider;
};

const getProvider = networkId => {
  if (!providers.hasOwnProperty(networkId)) {
    throw new Error('Invalid networkId');
  }

  return providers[networkId];
};

const getIota = network => {
  const { iota } = setMamProvider(network);

  return iota;
};

const getTicClient = async (network, seed) => {
  const iota = getIota(network);
  const ticClient = await tic.create.from({ seed, seed, iota });

  return ticClient;
};

const setMamProvider = async networkId => {
  const provider = getProvider(networkId);
  mamClient.setProvider(provider);
  const iota = mamClient.getIota();
  await mamClient.createMamFrom({ iota: iota });

  return {
    iota,
    mamClient
  };
};

module.exports = {
  getProviders,
  setProvider,
  getProvider,
  getIota,
  getTicClient,
  setMamProvider
};
