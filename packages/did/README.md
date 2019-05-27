# @tangleid/did

Utilities for the coding of decentralized identifiers.

## Installation

Install using [npm](https://www.npmjs.org/):

```shell
npm install @tangleid/did
```

or using [yarn](https://yarnpkg.com/):

```shell
yarn add @tangleid/did
```

## Network Identifiers

Used to describe which Tangle network interacts.

| Identitier | Network        |
| ---------- | -------------- |
| 0x1        | Tangle Mainnet |
| 0x2        | Tangle Devnet  |

## API Reference


* [did](#module_did)

    * [~encodeToDid(params)](#module_did..encodeToDid)

    * [~decodeFromDid(tangleid)](#module_did..decodeFromDid)

    * [~createMetaPublicKeys(controller, publicKeyPems)](#module_did..createMetaPublicKeys)


<a name="module_did..encodeToDid"></a>

### *did*~encodeToDid(params)
**Link**: https://w3c-ccg.github.io/did-spec/#the-generic-did-scheme DID Document}.  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Encode parameters. |
| params.network | <code>string</code> | Network identifier. |
| params.address | <code>string</code> | Address in 81-trytes format. |

Encode TangleID DID with specific network and address.

**Returns**: <code>string</code> - TangleID which follow the DID scheme  
<a name="module_did..decodeFromDid"></a>

### *did*~decodeFromDid(tangleid)

| Param | Type | Description |
| --- | --- | --- |
| tangleid | <code>string</code> | TangleID which follow the DID scheme   [DID Document](https://w3c-ccg.github.io/did-spec/#the-generic-did-scheme). |

Decode infromation of network and address from TangleID.

**Returns**: <code>Object</code> - } The infromation of network and address.  
<a name="module_did..createMetaPublicKeys"></a>

### *did*~createMetaPublicKeys(controller, publicKeyPems)

| Param | Type | Description |
| --- | --- | --- |
| controller | <code>string</code> | DID of the controller. |
| publicKeyPems | <code>Array.&lt;string&gt;</code> | PEM-formatted public Keys. |

Create metadata of public keys from PEM-formatted public Keys.

**Returns**: <code>Array.&lt;Object&gt;</code> - Public keys  
