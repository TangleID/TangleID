import SCHEMA_CONTEXT from './context/schema';
import SECURITY_V1_CONTEXT from './context/security-v1';
import SECURITY_V2_CONTEXT from './context/security-v2';
import CREDENTIAL_CONTEXT from './context/credential';
import {
  SCHEMA_CONTEXT_URL,
  CREDENTIAL_CONTEXT_URL,
  SECURITY_CONTEXT_URL,
  SECURITY_CONTEXT_V1_URL,
  SECURITY_CONTEXT_V2_URL,
} from '../../../contexts';
import { createDocumentLoader } from '../../src';
import { PublicKeyMeta } from '../../../types';

export const documents = {
  [SCHEMA_CONTEXT_URL]: SCHEMA_CONTEXT,
  [CREDENTIAL_CONTEXT_URL]: CREDENTIAL_CONTEXT,
  [SECURITY_CONTEXT_V1_URL]: SECURITY_V1_CONTEXT,
  [SECURITY_CONTEXT_V2_URL]: SECURITY_V2_CONTEXT,
};

export const documentLoader = createDocumentLoader(documents);

export const createDocumentLoaderByMetadata = (publicKey: PublicKeyMeta) => {
  const publicKeyDocument = {
    '@context': SECURITY_CONTEXT_URL,
    type: 'RsaVerificationKey2018',
    ...publicKey,
  };

  const controllerDocument = {
    '@context': SECURITY_CONTEXT_URL,
    id: publicKey.controller,
    publicKey: [publicKeyDocument],
    assertionMethod: [publicKeyDocument.id],
  };

  const { controller: controllerUrl, id: publicKeyUrl } = publicKey;

  const documents = {
    [publicKeyUrl]: publicKeyDocument,
    [controllerUrl]: controllerDocument,
    [CREDENTIAL_CONTEXT_URL]: CREDENTIAL_CONTEXT,
    [SCHEMA_CONTEXT_URL]: SCHEMA_CONTEXT,
  };

  const documentLoader = createDocumentLoader(documents);

  return documentLoader;
};
