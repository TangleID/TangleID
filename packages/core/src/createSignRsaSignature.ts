import { signRsaSignature } from '@tangleid/jsonld';
import { PublicKeyMeta, PrivateKeyPem } from '../..//types';

export const createSignRsaSignature = (documentLoader: any) => {
  /**
   * Sign JSON-LD document with RSA signature suite.
   *
   * @memberof module:core
   *
   * @function signRsaSignature
   * @param {object} document - JSON-LD document to be signed.
   * @param {PublicKeyMeta} publicKey - Public key metadata.
   * @param {string} privateKeyPem - PEM-formatted private key.
   * @returns {Promise<object>} Promise object represents signed JSON-LD document.
   */
  return async (document: any, publicKey: PublicKeyMeta, privateKeyPem: PrivateKeyPem) => {
    const documentSigned = await signRsaSignature(document, publicKey, privateKeyPem, {
      documentLoader,
    });

    return documentSigned;
  };
};
