import { IdenityRegistry } from '@tangleid/did';

import { Did } from '../../types';

export const createResolveIdentity = (registry: IdenityRegistry) => {
  /**
   * Fetch DID document by DID.
   *
   * @memberof module:core
   *
   * @function resolveIdentity
   * @param {string} did - The DID of DID document.
   * @returns {Promise<object>} Promise object represents the
   *   {@link https://w3c-ccg.github.io/did-spec/#did-documents DID Document}.
   */
  return async (did: Did) => {
    const didDocument = await registry.fetch(did);

    return didDocument;
  };
};
