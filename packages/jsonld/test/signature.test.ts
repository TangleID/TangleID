import { signRsaSignature, verifyRsaSignature, generateRsaKeyPair } from '../src';
import { createDocumentLoaderByMetadata } from './mock/documentLoader';

describe('signing credential', () => {
  let signed: any;
  let documentLoader: any;

  beforeAll(async () => {
    const { publicKeyPem, privateKeyPem } = generateRsaKeyPair();

    const credential = {
      '@context': ['https://www.w3.org/2018/credentials/v1', 'https://schema.org/'],
      id: 'http://example.edu/credentials/3732',
      type: ['VerifiableCredential'],
      credentialSubject: {
        id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
        alumniOf: '<span lang=\'en\'>Example University</span>',
      },
    };

    const publicKey = {
      id: 'https://example.com/i/alice/keys/1',
      type: 'RsaVerificationKey2018',
      controller:
        'did:tangle:MoWYKbBfezWbsTkYAngUu523F8YQgHfARhWWsTFSN2U45eAMpsSx3DnrV4SyZHCFuyDqjvQdg7',
      publicKeyPem,
    };

    documentLoader = createDocumentLoaderByMetadata(publicKey);

    signed = await signRsaSignature(credential, publicKey, privateKeyPem, {
      documentLoader,
    });
  });

  it('signature verification MUST be true', async () => {
    const verified = await verifyRsaSignature(signed, { documentLoader });
    expect(verified).toBe(true);
  });
});
