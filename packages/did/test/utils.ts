import * as forge from 'node-forge';

import { PublicKeyPem, PrivateKeyPem } from '../../types';
/**
 * Generate RSA key pairs.
 * @function generateKeyPair
 * @param {object} [options] - Generate key pair options.
 * @param {number} [bits] - Key length of key pair.
 */
export const generateKeyPair = ({ bits = 1024 } = {}): { publicKey: PublicKeyPem, privateKey: PrivateKeyPem } => {
  const keypair = forge.pki.rsa.generateKeyPair({ bits });
  const publicKey = forge.pki.publicKeyToPem(keypair.publicKey);
  const privateKey = forge.pki.privateKeyToPem(keypair.privateKey);

  return {
    publicKey,
    privateKey,
  };
};
