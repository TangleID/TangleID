import IOTA from "iota.lib.js";

var defaultNode = "http://node.iotawallet.info:14265/";

export var iota = new IOTA({
  provider: defaultNode
});

class Iota {
  //// Attach certificate to the tangle
  attach = async (seed, transfer) => {
    // Create random seed
    const seed = seed || seedGen(81);
    // Generate address for the seed
    const address = await generateAddress(seed);
    // Attach the address / send the signed packet.
    const transaction = await sendTransfer(seed, transfer);
    return transaction;
  };

  //// Find and decode tagged transactions
  getBundles = (type, uuid) => {
    // construct query
    const query = [iota.utils.toTrytes(type, uuid)]
    // Find transactions

    // Get Trytes
    const trytes = 
    // Decode Trytes
    const bundles = Object.assign([], trytes.map(o => iota.utils.fromTrytes(o)));
    return bundles;
  };
}

// IOTA - Generate an Address
const generateAddress = async seed => {
  const address = iota.api.getNewAddress(seed, { index: 0 }, (e, s) => {
    if (e) return alert(e);
    return s;
  });
  return address;
};

// IOTA - Attach your transfer to the tangle
const sendTransfer = async (seed, transfers) => {
  const transaction = await iota.api.sendTransfer(
    seed,
    6,
    15,
    transfers,
    (e, s) => {
      if (e) return alert(e);
      return s;
    }
  );
  return transaction;
};

// IOTA - Attach your transfer to the tangle
const find = async (query) => {
  const hashes = await iota.api.findTransactions(query,
    (e, s) => {
      if (e) return alert(e);
      return s;
    }
  );
  return transaction;
};

// Generate a random seed. Doesn't matter if secure or not.
const seedGen = length => {
  var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
  var i;
  var result = "";
  if (window.crypto && window.crypto.getRandomValues) {
    values = new Uint32Array(length);
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
