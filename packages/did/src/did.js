const { encodeToMnid, decodeFromMnid } = require('@tangleid/mnid');
//@ts-ignore
import { parse } from 'did-resolver';

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

/**
 * Generate public keys from PEM-formatted public Keys.
 * @function generatePublicKeys
 * @param {string} controller - DID of the controller.
 * @param {string[]} publicKeyPems - PEM-formatted public Keys.
 * @returns {Object[]} Public keys
 */
const generatePublicKeys = (controller, publicKeyPems) => {
  if (controller === undefined) {
    throw new Error('controller is not specified');
  }

  if (publicKeyPems === undefined) {
    throw new Error('publicKeyPems is not specified');
  }

  return publicKeyPems.map((publicKeyPem, index) => ({
    id: `${controller}#keys-${index + 1}`,
    type: 'RsaVerificationKey2018',
    controller,
    publicKeyPem
  }));
};

module.exports = {
  encodeToDid,
  decodeFromDid,
  generatePublicKeys
};
