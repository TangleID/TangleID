const mock = require('mam.tools.js/test/mamMock');
const { log } = require('mam.tools.js/lib/logger');

const { register, resolver } = require('../src/index');
const { generateKeyPair } = require('./utils');

// disable mam.tools.js console logging
log.silent = true;

jest.mock(
  'mam.client.js',
  () => {
    return mock;
  },
  { virtual: true }
);

let publicKey, did, document, resolved;

beforeAll(async () => {
  const keypair = generateKeyPair();
  publicKey = keypair.publicKey;

  const result = await register({
    network: '0x1',
    publicKey
  });
  did = result.did;
  document = result.document;
  resolved = await resolver(did);
});

describe('Idenity registration', () => {
  it('resolved document MUST be same as published document', () => {
    expect(resolved).toEqual(document);
  });

  it('public key property MUST be Array', () => {
    expect(Array.isArray(resolved.publicKey)).toBe(true);
  });

  it('public key property length MUST be 1', () => {
    expect(resolved.publicKey).toHaveLength(1);
  });
});
