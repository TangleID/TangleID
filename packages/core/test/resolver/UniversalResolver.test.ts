import UniversalResolver from '../../src/resolver/UniversalResolver';
import { DidDocument } from '../../..//types';

describe('@tangleid/core', () => {
  const SOVRIN_DID = 'did:sov:WRfXPg8dantKVubE3HX8pw';
  let didDocument: DidDocument;

  beforeAll(async () => {
    const resolver = new UniversalResolver('https://uniresolver.io');
    const resolved = await resolver.resolve(SOVRIN_DID);

    didDocument = resolved.didDocument;
    expect(true).toBe(true);
  });

  it('did of resolved document MUST be same as given', async () => {
    expect(didDocument.id).toBe(SOVRIN_DID);
  });
});
