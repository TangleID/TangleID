# @tangleid/mnid

Utilities for Multi Network Identifier (MNID).

## Installation

Install using [npm](https://www.npmjs.org/):

```shell
npm install @tangleid/mnid
```

or using [yarn](https://yarnpkg.com/):

```shell
yarn add @tangleid/mnid
```

## Network Identifiers

Used to describe which Tangle network interacts.

| Identitier | Network        |
| ---------- | -------------- |
| 0x1        | Tangle Mainnet |
| 0x2        | Tangle Devnet  |

## API Reference


* [mnid](#module_mnid)

    * [~generateChecksum(payload)](#module_mnid..generateChecksum)

    * [~encodeToMnid(params)](#module_mnid..encodeToMnid)

    * [~decodeFromMnid(mnid)](#module_mnid..decodeFromMnid)


<a name="module_mnid..generateChecksum"></a>

### *mnid*~generateChecksum(payload)

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Array.&lt;Buffer&gt;</code> | payload. |

Generate checksum from the payload

**Returns**: - 4-bytes checksum of the payload.  
<a name="module_mnid..encodeToMnid"></a>

### *mnid*~encodeToMnid(params)

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Encode parameters. |
| params.network | <code>string</code> | Network identifier. |
| params.address | <code>string</code> | Address in 81-trytes format. |

Encode MNID with specific network and address.

**Returns**: <code>string</code> - MNID  
<a name="module_mnid..decodeFromMnid"></a>

### *mnid*~decodeFromMnid(mnid)

| Param | Type | Description |
| --- | --- | --- |
| mnid | <code>string</code> | MNID will be decoded. |

Decode infromation of network and address from MNID.

**Returns**: <code>Object</code> - The infromation of network and address.  
