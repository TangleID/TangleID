import { IdenityRegistry } from '@tangleid/did';

import { NetworkIdentifer, Seed, PublicKeyPem } from '../../types';

export const createRegisterIdentifier = (registry: IdenityRegistry) => {
  /**
   * Publish the DID document to the Tangle MAM channel with specific network.
   *
   * @memberof module:core
   *
   * @function registerIdentifier
   * @param {string} network - The network identitfer.
   * @param {string} seed - The seed of the MAM channel.
   * @param {string[]} publicKeys - PEM-formatted public Keys.
   * @returns {Promise<object>} Promise object represents the result. The result
   *   conatains DID `did` and DID document `document`.
   */
  return async (seed: Seed, publicKeys: PublicKeyPem[] = []) => {
    const didDocument = await registry.publish(seed, publicKeys);

    return didDocument;
  };
};
