import { IdenityRegistry } from '@tangleid/did';
import { IriProvider } from '../../types';

import { DocumentLoader } from './jsonld/documentLoader';

import { createRegisterIdentifier } from './createRegisterIdentifier';
import { createResolveIdentifier } from './createResolveIdentifier';
import { createSignRsaSignature } from './createSignRsaSignature';
import { createVerifyRsaSignature } from './createVerifyRsaSignature';

export type Settings = {
  provider?: IriProvider;
};

/**
 * Composes API object from it's components
 *
 * @function composeAPI
 *
 * @memberof module:core
 *
 * @param {object} [settings={}] - Connection settings
 * @param {object} [params.provider] - Uri of IRI node.
 *
 * @return {API}
 */
export const composeAPI = (settings: Partial<Settings> = {}) => {
  const idenityRegistry = new IdenityRegistry({ provider: settings.provider });
  const documentLoader = new DocumentLoader(idenityRegistry);
  const loader = documentLoader.loader();

  return {
    registerIdentifier: createRegisterIdentifier(idenityRegistry),
    resolveIdentifier: createResolveIdentifier(idenityRegistry),
    signRsaSignature: createSignRsaSignature(loader),
    verifyRsaSignature: createVerifyRsaSignature(loader),
  };
};
