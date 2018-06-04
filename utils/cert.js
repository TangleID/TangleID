var IOTA = require('iota.lib.js')
var crypto = require('crypto')

var defaultNode = "http://node.deviceproof.org:14265";

var iota = new IOTA({
  provider: defaultNode
});

const attach = async (packet, uuid, type, seed) => {
  // Create random seed
  const transSeed = seed || seedGen(81);
  // Generate address for the seed
  const address = await generateAddress(transSeed);
  // Attach the address / send the signed packet.
  const transfer = [
    {
      address: address,
      value: 0,
      tag: uuid + type,
      message: iota.utils.toTrytes(JSON.stringify(packet))
    }
  ];
  const transaction = await sendTransfer(transSeed, transfer);
  return transaction;
};

//// Find and decode tagged transactions
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
    bundles.map(bun => {
      var data = { time: bun.timestamp, hash: bun.hash };
      const message = iota.utils.fromTrytes(
        bun.signatureMessageFragment.split("999", 1)[0]
      );
      try {
        data.message = JSON.parse(message);
      } catch (e) {
        data.message = message;
      }
      return data;
    })
  );
  return messages;
};

// IOTA - Generate an Address
const generateAddress = async seed => {
  var p = new Promise((res, rej) => {
    iota.api.getNewAddress(seed, { index: 0 }, (e, s) => {
      if (e) return rej(e);
      res(s);
    });
  });
  return p;
};

// IOTA - Attach your transfer to the tangle
const sendTransfer = async (seed, transfers) => {
  var p = new Promise((res, rej) => {
    console.log("Attaching to Tangle");
    iota.api.sendTransfer(seed, 6, 15, transfers, (e, s) => {
      if (e) return rej(e);
      res(s);
    });
  });
  return p;
};

// IOTA - Attach your transfer to the tangle
const find = async query => {
  var p = new Promise((res, rej) => {
    iota.api.findTransactions(query, (e, s) => {
      if (e) return rej(e);
      res(s);
    });
  });
  return p;
};

// IOTA - Attach your transfer to the tangle
const getTransactions = async hashes => {
  var p = new Promise((res, rej) => {
    iota.api.getTransactionsObjects(hashes, (e, s) => {
      if (e) return rej(e);
      res(s);
    });
  });
  return p;
};

const seedGen = length => {
  var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9'
  var result = ''
  var buf = [...crypto.randomBytes(length)]
  for (var i = 0; i < length; ++i) {
    result += charset[buf[i] % charset.length]
  }
  return result
}

module.exports = {
  attach,
  getBundles,
  generateAddress,
  sendTransfer,
  find,
  getTransactions
}
