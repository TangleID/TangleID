import { verifyRsaSignature } from '@tangleid/jsonld';

export const createVerifyRsaSignature = (documentLoader: any) => {
  /**
   * Verify JSON-LD document signature.
   *
   * @memberof module:core
   *
   * @function verifyRsaSignature
   * @param {object} document - JSON-LD document to be verify.
   * @returns {Promise<boolean>} Promise object represents verification result.
   */
  return async (document: any) => {
    const verified = await verifyRsaSignature(document, {
      documentLoader,
    });

    return verified;
  };
};
