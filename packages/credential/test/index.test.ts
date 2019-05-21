import { CREDENTIAL_CONTEXT_URL, SCHEMA_CONTEXT_URL, generateCredential } from '../src';

const credentaiExpected = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://schema.org/',
    {
      AlumniCredential: 'http://example.edu/AlumniCredential',
    },
  ],
  type: ['VerifiableCredential', 'AlumniCredential'],
  id: 'http://example.edu/credentials/3732',
  issuer: 'https://example.edu/issuers/14',
  issuanceDate: '2010-01-01T19:23:24Z',
  expirationDate: '2020-01-01T19:23:24Z',

  credentialSubject: {
    id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
    alumniOf: 'Example University',
  },
};

describe('Generate credential', () => {
  let credential: any;

  beforeAll(() => {
    const context = [CREDENTIAL_CONTEXT_URL, SCHEMA_CONTEXT_URL];

    const subject = {
      id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
      alumniOf: 'Example University',
    };
    const metadata = {
      id: 'http://example.edu/credentials/3732',
      type: ['VerifiableCredential', 'AlumniCredential'],
      issuer: 'https://example.edu/issuers/14',
      issuanceDate: '2010-01-01T19:23:24Z',
      expirationDate: '2020-01-01T19:23:24Z',
    };
    const alias = {
      AlumniCredential: 'http://example.edu/AlumniCredential',
    };
    credential = generateCredential({ context, subject, metadata, alias });
  });

  it('generated credential MUST be same as expected', async () => {
    expect(credential).toEqual(credentaiExpected);
  });
});
