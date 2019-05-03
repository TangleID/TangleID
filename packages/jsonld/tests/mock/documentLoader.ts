import SCHEMA_CONTEXT from './context/schema';
import SECURITY_V1_CONTEXT from './context/security-v1';
import SECURITY_V2_CONTEXT from './context/security-v2';
import CREDENTIAL_CONTEXT from './context/credential';
import {
  SCHEMA_CONTEXT_URL,
  CREDENTIAL_CONTEXT_URL,
  SECURITY_CONTEXT_V1_URL,
  SECURITY_CONTEXT_V2_URL,
} from '../../../contexts';
import { createDocumentLoader } from '../../src/documentLoader';

export const documents = {
  [SCHEMA_CONTEXT_URL]: SCHEMA_CONTEXT,
  [CREDENTIAL_CONTEXT_URL]: CREDENTIAL_CONTEXT,
  [SECURITY_CONTEXT_V1_URL]: SECURITY_V1_CONTEXT,
  [SECURITY_CONTEXT_V2_URL]: SECURITY_V2_CONTEXT,
};

export const documentLoader = createDocumentLoader(documents);
