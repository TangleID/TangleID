/** @module jsonld */
import * as forge from 'node-forge';
// @ts-ignore
import * as jsigs from 'jsonld-signatures';
// @ts-ignore
import { RSAKeyPair } from 'crypto-ld';
import { createDocumentLoader, strictExpansionMap } from '../src';
import { RsaKeyPair, PrivateKeyPem, PublicKeyMeta } from '../../types';

const { RsaSignature2018 } = jsigs.suites;
const { AssertionProofPurpose } = jsigs.purposes;

/**
 * Generate RSA key pair in PEM-formatted.
 * @function generateRsaKeyPair
 * @param {object} [options] - Generate key pair options.
 * @param {number} [options.bits] - Key length.
 * @returns {object} RSA Key pair.
 */
export const generateRsaKeyPair = ({ bits = 2048 } = {}): RsaKeyPair => {
  const keypair = forge.pki.rsa.generateKeyPair({ bits });
  const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
  const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);

  return {
    publicKeyPem,
    privateKeyPem,
  };
};

/**
 * Sign JSON-LD document with RSA crypto suite.
 * @function signRsaSignature
 * @param {object} document - JSON-LD document to be signed.
 * @param {PublicKeyMeta} publicKey - Public key metadata.
 * @param {string} privateKeyPem - PEM-formatted private key.
 * @param {object} [options] - Options for signing the document.
 * @param {object} [options.documentLoader] - Loader that retrieve external documents.
 * @returns {Promise<object>} Promise object represents signed JSON-LD document.
 */
export const signRsaSignature = async (
  document: any,
  publicKey: PublicKeyMeta,
  privateKeyPem: PrivateKeyPem,
  {
    documentLoader = createDocumentLoader(),
  }: {
    documentLoader?: any;
  } = {},
) => {
  const publicKeyMetadata = {
    '@context': jsigs.SECURITY_CONTEXT_URL,
    type: 'RsaVerificationKey2018',
    ...publicKey,
  };
  const key = new RSAKeyPair({ ...publicKeyMetadata, privateKeyPem });

  // @ts-ignore
  const signed = await jsigs.sign(document, {
    suite: new RsaSignature2018({ key }),
    purpose: new AssertionProofPurpose(),
    documentLoader,
    strictExpansionMap,
  });

  return signed;
};

/**
 * Verify JSON-LD document signature.
 * @function verifyRsaSignature
 * @param {object} document - JSON-LD document to be verify.
 * @param {object} [options] - Options for verifying the signature.
 * @param {object} [options.documentLoader] - Loader that retrieve external documents.
 * @returns {Promise<boolean>} Promise object represents verification result.
 */
export const verifyRsaSignature = async (
  document: any,
  {
    documentLoader = createDocumentLoader(),
  }: {
    documentLoader?: any;
  } = {},
): Promise<boolean> => {
  // @ts-ignore
  const result = await jsigs.verify(document, {
    suite: new RsaSignature2018(),
    purpose: new AssertionProofPurpose(),
    expansionMap: false,
    documentLoader,
  });

  return result.verified;
};
