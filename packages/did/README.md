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
/*
{
  did:
    'did:tangleid:MoWYKbBfezWbsTkYAngUu523F8YQgHfARhWWsTFSN2U45eAMpsSx3DnrV4SyZHCFuyDqjvQdg7',
  masterRoot:
    'OMEDQKSVKAFHEX9OSTBZLFBGXNMSUO9LEUFFCDTOSIJXCQMNFIHDCKHMUJCYPXGXXMPLHIAMLXBFAZADA',
  password: 'THISISTHESEEDOFTHETICACCOUNTANDISHOULDNOTGIVEITTOANYBODYELSE',
  profileRoot:
    'YMGVIKHFZIGUVANVHIUAKJUTPAZKBBLATTCOPJJAQPIKNUNYCKKHHHSUULSBYJVXDXDGUJKMGSIVZSPPI',
  contactsRoot:
    'PUZSASSTMBDGPPYJJEZZODAIFWBMIMPMBLWNMOHWVUQHVSAHEKO9LHUSFUZYJZ9DNKLU9MF9FOYXEWLTK'
}
*/
```

### Resolve DID Document

```javascript
const { resolver } = require('@tangleid/did');

const did =
  'did:tangleid:MoWYKbBfezWbsTkYAngUu523F8YQgHfARhWWsTFSN2U45eAMpsSx3DnrV4SyZHCFuyDqjvQdg7';
let didDoc = await resolver(result.did);
```

## API Reference


* [did](#module_did)

    * [~register(seed, network)](#module_did..register)

    * [~resolver(did)](#module_did..resolver)


<a name="module_did..register"></a>

### *did*~register(seed, network)

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>String</code> | The seed for the master channel. |
| network | <code>String</code> | The network identitfer. Mainnet: '0x1', Testnet: '0x2'. |

Register the TangleID DID(Decentralized Identifier) on the IOTA/Tangle.

**Returns**: <code>Promise</code> - Promise object represents the register result.  
<a name="module_did..resolver"></a>

### *did*~resolver(did)

| Param | Type | Description |
| --- | --- | --- |
| did | <code>String</code> | The DID to be resolved. |

Resolve the DID Document from the DID(Decentralized Identifier).

**Returns**: <code>Promise</code> - - Promise object represents the [DID Document](https://w3c-ccg.github.io/did-spec/#did-documents).  
