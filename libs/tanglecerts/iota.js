import IOTA from "iota.lib.js";

var defaultNode = "http://node.iotawallet.info:14265/";

export var iota = new IOTA({
  provider: defaultNode
});

class Iota {
  //// Attach certificate to the tangle
  static attach = async (message, uuid, seed) => {
    // Create random seed
    const transSeed = seed || seedGen(81);
    console.log(transSeed);
    // Generate address for the seed
    const address = await generateAddress(transSeed);
    console.log(address);
    // Attach the address / send the signed packet.
    const transfer = [
      {
        address: address,
        value: 0,
        tag: iota.utils.toTrytes(uuid),
        message: iota.utils.toTrytes("Hello")
      }
    ];
    console.log(transfer);

    const transaction = await sendTransfer(transSeed, transfer);
    return transaction;
  };

  //// Find and decode tagged transactions
  static getBundles = async (type, uuid) => {
    // construct query
    const query = { tags: [iota.utils.toTrytes(uuid + type)] };
    console.log(query);
    // Find transactions
    const hashes = await find(query);
    console.log(hashes);
    // Decode Trytes
    const bundles = await getTransactions(hashes);
    console.log(bundles);
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
    console.log(messages);
    return bundles;
  };
}

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

// Generate a random seed. Doesn't matter if secure or not.
const seedGen = length => {
  var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
  var i;
  var result = "";
  if (window.crypto && window.crypto.getRandomValues) {
    var values = new Uint32Array(length);
    window.crypto.getRandomValues(values);
    for (i = 0; i < length; i++) {
      result += charset[values[i] % charset.length];
    }
    return result;
  } else
    throw new Error(
      "Your browser sucks and can't generate secure random numbers"
    );
};

export default Iota;
