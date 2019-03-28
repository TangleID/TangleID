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

### Register DID

```javascript
const { register } = require('@tangleid/did');

const seed = 'THISISTHESEEDOFTHETICACCOUNTANDISHOULDNOTGIVEITTOANYBODYELSE';
const result = await register(seed, '0x2');
```

### Resolve DID Document

```javascript
const { resolver } = require('@tangleid/did');

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

    * [~register(seed, network, registry)](#module_did..register)

    * [~resolver(did, registry)](#module_did..resolver)


<a name="module_did..register"></a>

### *did*~register(seed, network, registry)

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>String</code> | The seed for the master channel. |
| network | <code>String</code> | The network identitfer. |
| registry | [<code>IdenityRegistry</code>](#IdenityRegistry) | The registry used to maintain the identity. |

Register the TangleID DID(Decentralized Identifier) on the IOTA/Tangle.

**Returns**: <code>Promise</code> - Promise object represents the register result.  
<a name="module_did..resolver"></a>

### *did*~resolver(did, registry)

| Param | Type | Description |
| --- | --- | --- |
| did | <code>String</code> | The DID to be resolved. |
| registry | [<code>IdenityRegistry</code>](#IdenityRegistry) | The registry used to maintain the identity. |

Resolve the DID Document from the DID(Decentralized Identifier).

**Returns**: <code>Promise</code> - - Promise object represents the [DID Document](https://w3c-ccg.github.io/did-spec/#did-documents).  
