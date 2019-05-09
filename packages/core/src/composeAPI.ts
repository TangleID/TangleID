import { IdenityRegistry } from '@tangleid/did';
import { IriProviders } from '../../types';

import { createDocumentLoader } from './jsonld/documentLoader';

import { createRegisterIdentity } from './createRegisterIdentity';
import { createResolveIdentity } from './createResolveIdentity';
import { createSignRsaSignature } from './createSignRsaSignature';
import { createVerifyRsaSignature } from './createVerifyRsaSignature';

export type Settings = {
  providers?: IriProviders;
};

/**
 * Composes API object from it's components
 *
 * @function composeAPI
 *
 * @memberof module:core
 *
 * @param {object} [settings={}] - Connection settings
 * @param {object} [params.providers] - The IRI node providers in differenct network.
 *
 * @return {API}
 */
export const composeAPI = (settings: Partial<Settings> = {}) => {
  const idenityRegistry = new IdenityRegistry({ providers: settings.providers });
  const documentLoader = createDocumentLoader(idenityRegistry);

  return {
    registerIdentity: createRegisterIdentity(idenityRegistry),
    resolveIdentity: createResolveIdentity(idenityRegistry),
    signRsaSignature: createSignRsaSignature(documentLoader),
    verifyRsaSignature: createVerifyRsaSignature(documentLoader),
  };
};
