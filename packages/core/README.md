# @tangleid/core

Core functionality to interact with TangleID. Includes methods for:
- Registering and resolving identity
- Signing JSON-LD document
- Verifying JSON-LD document signature

## Installation

Install using [npm](https://www.npmjs.org/):

```shell
npm install @tangleid/core
```

or using [yarn](https://yarnpkg.com/):

```shell
yarn add @tangleid/core
```

## API Reference


* [core](#module_core)

    * [.composeAPI([settings])](#module_core.composeAPI)

    * [.registerIdentity(network, seed, publicKeys)](#module_core.registerIdentity)

    * [.resolveIdentity(did)](#module_core.resolveIdentity)

    * [.signRsaSignature(document, publicKey, privateKeyPem)](#module_core.signRsaSignature)

    * [.verifyRsaSignature(document)](#module_core.verifyRsaSignature)


<a name="module_core.composeAPI"></a>

### *core*.composeAPI([settings])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [settings] | <code>object</code> | <code>{}</code> | Connection settings |
| [params.providers] | <code>object</code> |  | The IRI node providers in differenct network. |

Composes API object from it's components

<a name="module_core.registerIdentity"></a>

### *core*.registerIdentity(network, seed, publicKeys)

| Param | Type | Description |
| --- | --- | --- |
| network | <code>string</code> | The network identitfer. |
| seed | <code>string</code> | The seed of the MAM channel. |
| publicKeys | <code>Array.&lt;string&gt;</code> | PEM-formatted public Keys. |

Publish the DID document to the Tangle MAM channel with specific network.

**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object represents the result. The result
  conatains DID `did` and DID document `document`.  
<a name="module_core.resolveIdentity"></a>

### *core*.resolveIdentity(did)

| Param | Type | Description |
| --- | --- | --- |
| did | <code>string</code> | The DID of DID document. |

Fetch DID document by DID.

**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object represents the
  [DID Document](https://w3c-ccg.github.io/did-spec/#did-documents).  
<a name="module_core.signRsaSignature"></a>

### *core*.signRsaSignature(document, publicKey, privateKeyPem)

| Param | Type | Description |
| --- | --- | --- |
| document | <code>object</code> | JSON-LD document to be signed. |
| publicKey | <code>PublicKeyMeta</code> | Public key metadata. |
| privateKeyPem | <code>string</code> | PEM-formatted private key. |

Sign JSON-LD document with RSA signature suite.

**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object represents signed JSON-LD document.  
<a name="module_core.verifyRsaSignature"></a>

### *core*.verifyRsaSignature(document)

| Param | Type | Description |
| --- | --- | --- |
| document | <code>object</code> | JSON-LD document to be verify. |

Verify JSON-LD document signature.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - Promise object represents verification result.  
