const mock = require('mam.tools.js/test/mamMock');

const { DIDUtils } = require('../src/index');

jest.mock(
  'mam.client.js',
  () => {
    return mock;
  },
  { virtual: true }
);

describe('Register and Resolve DID Document', () => {
  it('Create DID document', async () => {
    const seed = 'THISISTHESEEDOFTHETICACCOUNTANDISHOULDNOTGIVEITTOANYBODYELSE';

    const result = await DIDUtils.register(seed, '0x2');
    let didDoc = await DIDUtils.resolver(result.did);
    expect(didDoc).toEqual({
      '@context': 'https://w3id.org/did/v1',
      id: result.did
    });
  });
});
