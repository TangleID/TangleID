const mock = require('mam.tools.js/test/mamMock');

const { register, resolver } = require('../src/index');

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

    const result = await register(seed, '0x2');
    let didDoc = await resolver(result.did);
    expect(didDoc).toEqual({
      '@context': 'https://w3id.org/did/v1',
      id: result.did
    });
  });
});
