const { Buffer } = require('buffer');
const { sha3_256 } = require('js-sha3');
const { parse } = require('did-resolver');

const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const base58 = require('base-x')(BASE58);
const hex = require('base-x')('0123456789abcdef');

const TRYTE = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const tryte = require('base-x')(TRYTE);

/**
 * Generate checksum from the payload
 * @function generateChecksum
 * @param {Buffer[]} payload - payload.
 * @returns - 4-bytes checksum of the payload.
 */
const generateChecksum = payload => {
  if (payload === undefined) {
    throw new Error('payload not given');
  }
  return Buffer.from(sha3_256(Buffer.concat(payload)), 'hex').slice(0, 4);
};

/**
 * Encode MNID with specific network and address.
 * @function encodeToMnid
 * @param {object} params - Encode parameters.
 * @param {string} params.network - Network identifier.
 * @param {string} params.address - Address in 81-trytes format.
 * @returns {string} MNID
 */
const encodeToMnid = ({ network, address }) => {
  const payload = [
    Buffer.from('01', 'hex'),
    hex.decode(network.slice(2)),
    tryte.decode(address.slice(0, 81))
  ];
  const checksum = generateChecksum(payload);
  payload.push(checksum);
  return base58.encode(Buffer.concat(payload));
};

/**
 * Encode TangleID DID with specific network and address.
 * @function encodeToDid
 * @param {object} params - Encode parameters.
 * @param {string} params.network - Network identifier.
 * @param {string} params.address - Address in 81-trytes format.
 * @returns {string} TangleID which follow the DID scheme {@link https://w3c-ccg.github.io/did-spec/#the-generic-did-scheme DID Document}.
 */
const encodeToDid = ({ network, address }) => {
  const mnid = encodeToMnid({
    network,
    address
  });
  const did = `did:tangleid:${mnid}`;

  return did;
};

/**
 * Decode infromation of network and address from MNID.
 * @function decodeFromMnid
 * @param {string} mnid - MNID will be decoded.
 * @returns {{network: string, address: string}}} The infromation of network and address.
 */
const decodeFromMnid = mnid => {
  const data = Buffer.from(base58.decode(mnid));
  const version = data.slice(0, 1);
  const network = data.slice(1, 2);
  const address = data.slice(2, data.length - 4);
  const check = data.slice(data.length - 4);

  const checksum = generateChecksum([version, network, address]);
  if (!check.equals(checksum)) {
    throw new Error('Invalid address checksum');
  }

  return {
    network: `0x${hex.encode(network)}`,
    address: `${tryte.encode(address)}`
  };
};

/**
 * Decode infromation of network and address from TangleID.
 * @function decodeFromDid
 * @param {string} tangleid - TangleID which follow the DID scheme {@link https://w3c-ccg.github.io/did-spec/#the-generic-did-scheme DID Document}.
 * @returns {{network: string, address: string}}} The infromation of network and address.
 */
const decodeFromDid = tangleid => {
  const parsed = parse(tangleid);
  const mamParsed = decodeFromMnid(parsed.id);

  return mamParsed;
};

module.exports = {
  encodeToMnid,
  encodeToDid,
  decodeFromMnid,
  decodeFromDid
};
