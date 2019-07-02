/** @module mnid */
import { Buffer } from 'buffer';
import { sha3_256 } from 'js-sha3';
// @ts-ignore
import * as baseX from 'base-x';
import { Payload, MnidModel, Mnid } from '../../types';

const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const base58 = baseX(BASE58);
const hex = baseX('0123456789abcdef');

const TRYTE = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const tryte = baseX(TRYTE);

/**
 * Generate checksum from the payload
 * @function generateChecksum
 * @param {Buffer[]} payload - payload.
 * @returns - 4-bytes checksum of the payload.
 */
const generateChecksum = (payload: Payload) => {
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
export const encodeToMnid = ({ network, address }: MnidModel): Mnid => {
  const payload = [
    Buffer.from('01', 'hex'),
    hex.decode(network.slice(2)),
    tryte.decode(address.slice(0, 81)),
  ];
  const checksum = generateChecksum(payload);
  payload.push(checksum);
  return base58.encode(Buffer.concat(payload));
};

/**
 * Decode infromation of network and address from MNID.
 * @function decodeFromMnid
 * @param {string} mnid - MNID will be decoded.
 * @returns {{network: string, address: string}} The infromation of network and address.
 */
export const decodeFromMnid = (mnid: Mnid) => {
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
    address: `${tryte.encode(address)}`,
  };
};
