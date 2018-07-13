const crypto = require('crypto');
const tools = require('./tools.js');
const iota = require('./iotaSetup.js');

/**
 * Find the transaction by the query object.
 *
 * @param {Object} query - Object List of transaction hashes. e.g. {'hashes': ['ABCD']}
 * @returns {Promise} Promise object represents list of all the transaction hash.
 */
const find = async (query) => {
  const p = new Promise((res, rej) => {
    iota.api.findTransactions(query, (e, s) => {
      if (e) return rej(e);
      res(s);
    });
  });
  return p;
};

/**
 * Broadcasts and stores the transactions locally.
 *
 * @param {string} seed - Tryte-encoded seed will be used for signing and picking inputs.
 * @param {Array} transfers - Array of transfer objects.
 * @returns {Promise} Promise object represents array of the transfer.
 */
const sendTransfer = async (seed, transfers) => {
  const p = new Promise((res, rej) => {
    console.log('Attaching to Tangle');
    iota.api.sendTransfer(seed, 6, 15, transfers, (e, s) => {
      if (e) return rej(e);
      res(s);
    });
  });
  return p;
};

/**
 * Get entire transaction objects for a list of transaction hashes.
 *
 * @function getTransactions
 * @param {Array} hashes - List of transaction hashes.
 * @returns {Promise} Promise object represents list of all the transaction objects.
 */
const getTransactions = async (hashes) => {
  const p = new Promise((res, rej) => {
    iota.api.getTransactionsObjects(hashes, (e, s) => {
      if (e) return rej(e);
      res(s);
    });
  });
  return p;
};

/**
 * Generates a new address from a seed and returns the address.
 *
 * @function generateAddress
 * @param {number} seed - The security options. It can be 1, 2, 3.
 * @returns {Promise} Promise object represents the new address.
 */
// IOTA - Generate an Address
const generateAddress = async (seed) => {
  const p = new Promise((res, rej) => {
    iota.api.getNewAddress(seed, { index: 0 }, (e, s) => {
      if (e) return rej(e);
      res(s);
    });
  });
  return p;
};

// IOTA - Attach a transaction to the tangle
const attach = async (packet, uuid, type, seed) => {
  // Create random seed
  const transSeed = seed || tools.seedGen(81);
  // Generate address for the seed
  const address = await generateAddress(transSeed);
  // Attach the address / send the signed packet.
  const transfer = [
    {
      address,
      value: 0,
      tag: uuid + type,
      message: iota.utils.toTrytes(JSON.stringify(packet)),
    },
  ];
  const transaction = await sendTransfer(transSeed, transfer);
  return transaction;
};

// // Find and decode tagged transactions
const getBundles = async (uuid, type) => {
  // construct query
  const query = { tags: [uuid + type] };

  // Find transactions
  const hashes = await find(query);
  // Decode Trytes
  const bundles = await getTransactions(hashes);
  // Take messages and prettyfy them.
  const messages = Object.assign(
    [],
    bundles.map((bun) => {
      const data = { time: bun.timestamp, hash: bun.hash };
      const message = iota.utils.fromTrytes(bun.signatureMessageFragment.split('999', 1)[0]);
      try {
        data.message = JSON.parse(message);
      } catch (e) {
        data.message = message;
      }
      return data;
    }),
  );
  return messages;
};


module.exports = {
  find,
  sendTransfer,
  getTransactions,
  generateAddress,
  attach,
  getBundles,
};
