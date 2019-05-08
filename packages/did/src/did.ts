import { encodeToMnid, decodeFromMnid } from '@tangleid/mnid';
// @ts-ignore
import { parse } from 'did-resolver';
import { Did, MnidModel, PublicKeyPem, PublicKeyMeta } from '../../types';
/**
 * Encode TangleID DID with specific network and address.
 * @function encodeToDid
 * @param {object} params - Encode parameters.
 * @param {string} params.network - Network identifier.
 * @param {string} params.address - Address in 81-trytes format.
 * @returns {string} TangleID which follow the DID scheme
 *   @link https://w3c-ccg.github.io/did-spec/#the-generic-did-scheme DID Document}.
 */
export const encodeToDid = ({ network, address }: MnidModel): Did => {
  const mnid = encodeToMnid({
    network,
    address,
  });
  const did = `did:tangleid:${mnid}`;

  return did;
};

/**
 * Decode infromation of network and address from TangleID.
 * @function decodeFromDid
 * @param {string} tangleid - TangleID which follow the DID scheme
 *   {@link https://w3c-ccg.github.io/did-spec/#the-generic-did-scheme DID Document}.
 * @returns {{network: string, address: string}}} The infromation of network and address.
 */
export const decodeFromDid = (tangleid: Did): MnidModel => {
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
export const generatePublicKeys = (
  controller: Did,
  publicKeyPems: PublicKeyPem[],
): PublicKeyMeta[] => {
  if (controller === undefined) {
    throw new Error('controller is not specified');
  }

  if (publicKeyPems === undefined) {
    throw new Error('publicKeyPems is not specified');
  }

  return publicKeyPems.map((publicKeyPem: PublicKeyPem, index) => ({
    id: `${controller}#keys-${index + 1}`,
    type: 'RsaVerificationKey2018',
    controller,
    publicKeyPem,
  }));
};
