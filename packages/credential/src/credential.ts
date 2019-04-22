/** @module credential */
import { CREDENTIAL_CONTEXT_URL } from '../../contexts';
import {
  CredentialMetadata,
  ContextArray,
  CredentialSubject,
  ContextTypeAlias,
} from '../../types';

type ComposeCredentialParams = {
  subject: CredentialSubject;
  metadata?: CredentialMetadata;
  context?: ContextArray;
  alias?: ContextTypeAlias;
};

/**
 * Generate credential object.
 * @function generateCredential
 * @param {object} params - Parameters for generating the credential object.
 * @param {object} params.subject - Subject of the credential.
 * @param {object} [params.metadata = {}] - Metadata of the credential.
 * @param {object} [params.context = ['https://www.w3.org/2018/credentials/v1']] - Context URLs of the credential.
 * @param {object} [params.alias = {}] - Context alias of the credential.
 *
 * @returns {object} Credential object in JSON-LD format.
 */
export const generateCredential = ({
  subject,
  metadata = {},
  context = [CREDENTIAL_CONTEXT_URL],
  alias = {},
}: ComposeCredentialParams) => {
  const contextMerged = [...context, alias];

  if (!metadata.type) {
    metadata.type = ['VerifiableCredential'];
  }

  const credential = {
    '@context': contextMerged,
    ...metadata,
    credentialSubject: subject,
  };

  return credential;
};
