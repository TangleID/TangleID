/* tslint:disable */
const mock = require('mam.tools.js/test/mamMock');
const { log } = require('mam.tools.js/lib/logger');
/* tslint:enable */
// @ts-ignore
import * as mamClient from 'mam.tools.js';

import { IdenityRegistry } from '../src';
import { generateKeyPair } from './utils';
import { DidDocument } from '../../types';

// disable mam.tools.js console logging
log.silent = true;

jest.mock(
  'mam.client.js',
  () => {
    return mock;
  },
  { virtual: true },
);

let publicKeys: string[];
let did: string;
let document: DidDocument;
let resolved: DidDocument;

beforeAll(async () => {
  const keypair = generateKeyPair();
  publicKeys = [keypair.publicKey];

  const registry = new IdenityRegistry();
  const result = await registry.publish('0x1', mamClient.generateSeed(), publicKeys);
  did = result.did;
  document = result.document;
  resolved = await registry.fetch(did);
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
