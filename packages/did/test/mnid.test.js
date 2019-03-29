import { encodeToMnid, decodeFromMnid } from '../src/mnid';

const NETWORK = '0x1';
const ADDRESS =
  'NZM9BLOBTPNNKTJOFRWEVWIJTL9ESTKFKQZEPVQLFVYYQLEDRFLKQHPBS99TXEXNCTZCOKTNEGHG9QGR9';
const MNID =
  'MiqGgUdwdCHjudYe15YsjkTkc45izoB2F7eG7TA5aSG6k8pQyC6L41qrTctEupgRXJGhJNPqc1';

describe('MNID encoding module', () => {
  it('encode network identifier and address to MNID', () => {
    const encoded = encodeToMnid({ network: NETWORK, address: ADDRESS });
    expect(encoded).toEqual(MNID);
  });

  it('decode MNID to network identifier and address', () => {
    const { network, address } = decodeFromMnid(MNID);
    expect(network).toEqual(NETWORK);
    expect(address).toEqual(ADDRESS);
  });
});
