import { IdenityRegistry } from '@tangleid/did';
import { IriProviders } from '../../types';

import { DocumentLoader } from './jsonld/documentLoader';

import { createRegisterIdentifier } from './createRegisterIdentifier';
import { createResolveIdentifier } from './createResolveIdentifier';
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
  const documentLoader = new DocumentLoader(idenityRegistry);
  const loader = documentLoader.loader();

  return {
    registerIdentifier: createRegisterIdentifier(idenityRegistry),
    resolveIdentifier: createResolveIdentifier(idenityRegistry),
    signRsaSignature: createSignRsaSignature(loader),
    verifyRsaSignature: createVerifyRsaSignature(loader),
  };
};
