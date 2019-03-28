const mock = require('mam.tools.js/test/mamMock');
const { log } = require('mam.tools.js/lib/logger');

const { register, resolver } = require('../src/index');

// disable mam.tools.js console logging
log.silent = true;

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
    const { did, document } = await register({ seed, network: '0x1' });
    const resolved = await resolver(did);

    expect(resolved).toEqual(document);
  });
});
