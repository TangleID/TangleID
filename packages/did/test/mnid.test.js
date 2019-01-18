import { encode, decode } from '../src/mnid';

describe('encode', () => {
  it('Mainnet', () => {
    // 81-trytes unique hash of transaction
    let hash =
      'NZM9BLOBTPNNKTJOFRWEVWIJTL9ESTKFKQZEPVQLFVYYQLEDRFLKQHPBS99TXEXNCTZCOKTNEGHG9QGR9UUEZTOWAC';
    let mnid = encode({
      network: '0x1', // the hex encoded network id or for private chains the hex encoded first 4 bytes of the genesis hash
      address: hash
    });
    expect(mnid).toEqual(
      'MiqGgUdwdCHjudYe15YsjkTkc45izoB2F7eG7TA5aSG6k8pQyC6L41qrTctEupgRXJGhJNPqc1'
    );
  });
});

describe('decode', () => {
  it('Mainnet', () => {
    let mnid =
      'MiqGgUdwdCHjudYe15YsjkTkc45izoB2F7eG7TA5aSG6k8pQyC6L41qrTctEupgRXJGhJNPqc1';
    let hashExpected =
      'NZM9BLOBTPNNKTJOFRWEVWIJTL9ESTKFKQZEPVQLFVYYQLEDRFLKQHPBS99TXEXNCTZCOKTNEGHG9QGR9';
    expect(decode(mnid)).toEqual({
      network: '0x1', // the hex encoded network id or for private chains the hex encoded first 4 bytes of the genesis hash
      address: hashExpected
    });
  });
});
