/** @module did */
// @ts-ignore
import { Did, PublicKeyPem, PublicKeyMeta } from '../../types';

const DID_URL_REGEX = /^did:(?<method>[a-z0-9]+):(?<idstring>[A-Za-z0-9\.\-_]+)(?:#(?<fragment>.*))?$/;
const IDSTRING_REGEX = /^(?<channelRoot>[A-Z9]{81})_?$/;

/**
 * Encode TangleID DID.
 * @function encodeToDid
 * @param {object} channelRoot - Channel root of MAM message.
 * @returns {string} TangleID which follow the DID scheme
 *   @link https://w3c-ccg.github.io/did-spec/#the-generic-did-scheme DID Document}.
 */
export const encodeToDid = (channelRoot: string): Did => {
  const did = `did:tangle:${channelRoot}_`;

  return did;
};

/**
 * Decode identifier infromation from TangleID DID.
 * @function decodeFromDid
 * @param {string} tangleid - TangleID which follow the DID scheme
 *   {@link https://w3c-ccg.github.io/did-spec/#the-generic-did-scheme DID Document}.
 * @returns {{method: string, idstring: string, fragment: string, channelRoot: string}}
 *   The infromation of identifier.
 */
export const decodeFromDid = (tangleid: Did) => {
  const decoded = decodeFromDidUrl(tangleid);
  if (decoded.method !== 'tangle') {
    throw new TypeError(`Unsupport method '${decoded.method}'`);
  }

  const matches = IDSTRING_REGEX.exec(decoded.idstring);
  if (matches === null) {
    throw new Error('Invalid idstring');
  }

  const [, channelRoot] = matches;
  return {
    ...decoded,
    channelRoot,
  };
};

/**
 * Checks if given URL is a DID URL.
 * @function isDidUrl
 * @param {string} url - the URL to be checked.
 * @return {boolean} The boolean that represent the url whether DID URL.
 */
export const isDidUrl = (url: string): boolean => {
  return DID_URL_REGEX.test(url);
};

/**
 * Decode information of the DID URL.
 * @function decodeFromDidUrl
 * @param {string} url - the DID URL that will be decoded.
 * @return {{did: string, method: string, idstring: string, fragment: string | null}}
 *   The information of the DID URL. {@link https://w3c-ccg.github.io/did-spec/#generic-did-syntax}
 */
export const decodeFromDidUrl = (url: string) => {
  const matches = DID_URL_REGEX.exec(url);
  if (matches === null) {
    throw new Error('Invalid DID URL');
  }

  const [, method, idstring, fragment] = matches;

  return {
    did: `did:${method}:${idstring}`,
    method,
    idstring,
    fragment: fragment || null,
  };
};

/**
 * Create metadata of public keys from PEM-formatted public Keys.
 * @function createMetaPublicKeys
 * @param {string} controller - DID of the controller.
 * @param {string[]} publicKeyPems - PEM-formatted public Keys.
 * @returns {Object[]} Public keys
 */
export const createMetaPublicKeys = (
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
