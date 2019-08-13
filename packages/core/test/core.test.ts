/* tslint:disable */
const mock = require('mam.tools.js/test/mamMock');
const { log } = require('mam.tools.js/lib/logger');

import { composeAPI } from '../src';
import { publicKeyPem, privateKeyPem } from './keypair';
import { generateSeed } from './utilities';

// disable mam.tools.js console logging
log.silent = true;

jest.mock(
  'mam.client.js',
  () => {
    return mock;
  },
  { virtual: true }
);

describe('@tangleid/core', () => {
  it('register identifier and generate a verifiable credential', async () => {
    const tid = composeAPI({
      provider: 'https://tangle.puyuma.org',
    });

    const seed = generateSeed();
    const { document } = await tid.registerIdentifier(seed, [publicKeyPem]);

    // @ts-ignore
    const publicKey = document.publicKey[0];

    const credential = {
      '@context': ['https://www.w3.org/2018/credentials/v1', 'http://schema.org'],
      id: 'http://example.edu/credentials/58473',
      type: ['VerifiableCredential', 'AlumniCredential'],
      credentialSubject: {
        id: 'did:tangle:5i1WeTSiRnsUBwj3DGLxHzENfryPxKUzkMES98S57LLAauY2NF5dx17yPke9PaoVYY9Qhh47J',
        alumniOf: 'Example University',
      },
    };

    const credentialSigned = await tid.signRsaSignature(credential, publicKey, privateKeyPem);
    const verified = await tid.verifyRsaSignature(credentialSigned);

    expect(verified).toBe(true);
  }, 9000);
});
