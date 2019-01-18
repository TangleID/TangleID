const { Buffer } = require('buffer');
const { sha3_256 } = require('js-sha3');
const { parse } = require('did-resolver');

var BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
var base58 = require('base-x')(BASE58);
var hex = require('base-x')('0123456789abcdef');

var TRYTE = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var tryte = require('base-x')(TRYTE);

function checksum(payload) {
  return new Buffer(sha3_256(Buffer.concat(payload)), 'hex').slice(0, 4);
}

function encode({ network, address }) {
  const payload = [
    new Buffer('01', 'hex'),
    hex.decode(network.slice(2)),
    tryte.decode(address.slice(0, 81))
  ];
  payload.push(checksum(payload));
  return base58.encode(Buffer.concat(payload));
}

function encodeToDid({ network, address }) {
  const mnid = encode({
    network,
    address
  });
  const did = `did:tangleid:${mnid}`;

  return did;
}

function decode(mnid) {
  const data = Buffer.from(base58.decode(mnid));
  const version = data.slice(0, 1);
  const network = data.slice(1, 2);
  const address = data.slice(2, data.length - 4);
  const check = data.slice(data.length - 4);

  if (check.equals(checksum([version, network, address]))) {
    return {
      network: `0x${hex.encode(network)}`,
      address: `${tryte.encode(address)}`
    };
  } else {
    throw new Error('Invalid address checksum');
  }
}

function decodeFromDid(did) {
  const parsed = parse(did);
  const mamParsed = decode(parsed.id);

  return mamParsed;
}

module.exports = {
  encode,
  encodeToDid,
  decode,
  decodeFromDid
};
