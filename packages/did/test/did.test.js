const mock = require('mam.tools.js/test/mamMock');

const { register, resolver } = require('../src/index');

jest.mock(
  'mam.client.js',
  () => {
    return mock;
  },
  { virtual: true }
);

describe('Idenity registration', () => {
  it('resolved document MUST be same as published document', async () => {
    const seed = 'THISISTHESEEDOFTHETICACCOUNTANDISHOULDNOTGIVEITTOANYBODYELSE';
    const { did, document } = await register(seed, '0x1');
    const resolved = await resolver(did);

    expect(resolved).toEqual(document);
  });
});
