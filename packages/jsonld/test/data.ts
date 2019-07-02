export const document = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://schema.org/',
    { '@version': 1.1 },
  ],
  type: ['VerifiableCredential'],
  id: 'http://example.edu/credentials/3732',
  issuer: 'https://example.edu/issuers/14',
  issuanceDate: '2010-01-01T19:23:24Z',
  expirationDate: '2020-01-01T19:23:24Z',
  credentialSubject: {
    id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
    alumniOf: 'Example University',
  },
};

export const expected_compacted = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://schema.org/',
    { '@version': 1.1 },
  ],
  id: 'http://example.edu/credentials/3732',
  type: 'VerifiableCredential',
  credentialSubject: {
    id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
    alumniOf: 'Example University',
  },
  expirationDate: '2020-01-01T19:23:24Z',
  issuanceDate: '2010-01-01T19:23:24Z',
  issuer: 'https://example.edu/issuers/14',
};

export const expected_expaneded = [
  {
    'https://w3.org/2018/credentials#credentialSubject': [
      {
        'http://schema.org/alumniOf': [{ '@value': 'Example University' }],
        '@id': 'did:example:ebfeb1f712ebc6f1c276e12ec21',
      },
    ],
    'https://w3.org/2018/credentials#expirationDate': [
      {
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
        '@value': '2020-01-01T19:23:24Z',
      },
    ],
    '@id': 'http://example.edu/credentials/3732',
    'https://w3.org/2018/credentials#issuanceDate': [
      {
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
        '@value': '2010-01-01T19:23:24Z',
      },
    ],
    'https://w3.org/2018/credentials#issuer': [
      { '@id': 'https://example.edu/issuers/14' },
    ],
    '@type': ['https://w3.org/2018/credentials#VerifiableCredential'],
  },
];

// tslint:disable:max-line-length
export const expected_canonized =
  '<did:example:ebfeb1f712ebc6f1c276e12ec21> <http://schema.org/alumniOf> "Example University" .\n<http://example.edu/credentials/3732> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://w3.org/2018/credentials#VerifiableCredential> .\n<http://example.edu/credentials/3732> <https://w3.org/2018/credentials#credentialSubject> <did:example:ebfeb1f712ebc6f1c276e12ec21> .\n<http://example.edu/credentials/3732> <https://w3.org/2018/credentials#expirationDate> "2020-01-01T19:23:24Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .\n<http://example.edu/credentials/3732> <https://w3.org/2018/credentials#issuanceDate> "2010-01-01T19:23:24Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .\n<http://example.edu/credentials/3732> <https://w3.org/2018/credentials#issuer> <https://example.edu/issuers/14> .\n';
