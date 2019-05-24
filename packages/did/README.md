# @tangleid/did

Utilities for Decentralized Identifiers(DIDs) registration and resolve.

## Installation

Install using [npm](https://www.npmjs.org/):

```shell
npm install @tangleid/did
```

or using [yarn](https://yarnpkg.com/):

```shell
yarn add @tangleid/did
```

## Quick Start

### Register Decentralized Identifier for Digital Identity

```javascript
const { register } = require('@tangleid/did');

const seed = 'THISISTHESEEDOFTHETICACCOUNTANDISHOULDNOTGIVEITTOANYBODYELSE';
const publicKey = '-----BEGIN PUBLIC KEY-----//..-----END PUBLIC KEY-----';
const { did, document, seed } = await register({ seed, network: '0x1', publicKey });
```

#### Register Decentralized Identifier with Specific IOTA nodes

```javascript
import { register, IdenityRegistry } from '@tangleid/did';
const seed = 'THISISTHESEEDOFTHETICACCOUNTANDISHOULDNOTGIVEITTOANYBODYELSE';
const publicKey = '-----BEGIN PUBLIC KEY-----//..-----END PUBLIC KEY-----';
const registry = new IdenityRegistry({
  providers: {
    '0x1': 'https://nodes.thetangle.org:443',
    '0x2': 'https://nodes.devnet.thetangle.org:443',
  },
});

const { did, document, seed } = await register({
  seed,
  network: '0x1',
  publicKey,
  registry,
});
```

### Resolve DID Document

```javascript
const { resolver } = require('@tangleid/did');

const did =
  'did:tangleid:MoWYKbBfezWbsTkYAngUu523F8YQgHfARhWWsTFSN2U45eAMpsSx3DnrV4SyZHCFuyDqjvQdg7';
let didDoc = await resolver(result.did);
```

#### Resolve DID Document with Specific Nodes

```javascript
const { resolver, IdenityRegistry } = require('@tangleid/did');

const registry = new IdenityRegistry({
  providers: {
    '0x1': 'https://nodes.thetangle.org:443',
    '0x2': 'https://nodes.devnet.thetangle.org:443',
  },
});

const did =
  'did:tangleid:MoWYKbBfezWbsTkYAngUu523F8YQgHfARhWWsTFSN2U45eAMpsSx3DnrV4SyZHCFuyDqjvQdg7';
let didDoc = await resolver(result.did);
```

## Network Identifiers

Used to describe which Tangle network interacts.

| Identitier | Network        |
| ---------- | -------------- |
| 0x1        | Tangle Mainnet |
| 0x2        | Tangle Devnet  |

## API Reference


* [did](#module_did)

    * [~register([options])](#module_did..register)

    * [~resolver(did, registry)](#module_did..resolver)


<a name="module_did..register"></a>

### *did*~register([options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | Registration options |
| [options.seed] | <code>string</code> | <code>&quot;mamClient.generateSeed()&quot;</code> | The seed for the master channel. |
| [options.network] | <code>string</code> | <code>&quot;0x1&quot;</code> | The network identitfer. |
| [options.publicKey] | <code>String</code> \| <code>Array.&lt;string&gt;</code> | <code>[]</code> | PEM-formatted public Key. |
| [options.registry] | [<code>IdenityRegistry</code>](#IdenityRegistry) | <code>new IdenityRegistry()</code> | The registry used to maintain the identity. |

Register the TangleID DID(Decentralized Identifier) on the IOTA/Tangle.

**Returns**: <code>Promise</code> - Promise object represents the register result.  
<a name="module_did..resolver"></a>

### *did*~resolver(did, registry)

| Param | Type | Description |
| --- | --- | --- |
| did | <code>String</code> | The DID to be resolved. |
| registry | [<code>IdenityRegistry</code>](#IdenityRegistry) | The registry used to maintain the identity. |

Resolve the DID Document from the DID(Decentralized Identifier).

**Returns**: <code>Promise</code> - Promise object represents the
  [DID Document](https://w3c-ccg.github.io/did-spec/#did-documents).  
