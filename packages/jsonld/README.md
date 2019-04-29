# @tangleid/jsonld

Utilities for processing JSON-LD format.

## Installation

Install using [npm](https://www.npmjs.org/):

```shell
npm install @tangleid/jsonld
```

or using [yarn](https://yarnpkg.com/):

```shell
yarn add @tangleid/jsonld
```

## API Reference


* [jsonld](#module_jsonld)

    * [~createDocumentLoader([documents])](#module_jsonld..createDocumentLoader)

    * [~compact(document, context, [options])](#module_jsonld..compact)

    * [~expand(document, [options])](#module_jsonld..expand)

    * [~canonize(input, [options])](#module_jsonld..canonize)

    * [~generateRsaKeyPair([options])](#module_jsonld..generateRsaKeyPair)

    * [~signRsaSignature(document, publicKey, privateKeyPem, [options])](#module_jsonld..signRsaSignature)

    * [~verifyRsaSignature(document, [options])](#module_jsonld..verifyRsaSignature)


<a name="module_jsonld..createDocumentLoader"></a>

### *jsonld*~createDocumentLoader([documents])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [documents] | <code>object</code> | <code>{}</code> | JSON-LD documents in initial cache. |

Create JSON-LD document loader with cache.

<a name="module_jsonld..compact"></a>

### *jsonld*~compact(document, context, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| document | <code>object</code> |  | JSON-LD document to compacted. |
| context | <code>context</code> |  | the context to compact with. |
| [options] | <code>object</code> | <code>{}</code> | Options of the compaction. |
| [options.base] | <code>string</code> |  | the base IRI to use. |
| [options.compactArrays] | <code>boolean</code> | <code>true</code> | true to compact arrays to single values when   appropriate, false not to (default: true). |
| [options.compactToRelative] | <code>boolean</code> | <code>true</code> | true to compact IRIs to be relative to document   base, false to keep absolute (default: true) |
| [options.graph] | <code>boolean</code> | <code>false</code> | true to always output a top-level graph (default: false). |
| [options.expandContext] | <code>context</code> |  | a context to expand with. |
| [options.skipExpansion] | <code>boolean</code> | <code>false</code> | true to assume the document is expanded and skip   expansion, false not to, defaults to false. |
| [options.documentLoader] | <code>documentLoader</code> |  | the document loader. |
| [options.expansionMap] | <code>expansionMap</code> |  | a function that can be used to custom map   unmappable values (or to throw an error when they are detected);   if this function returns `undefined` then the default behavior   will be used. |
| [options.framing] | <code>boolean</code> | <code>false</code> | true if compaction is occuring during a framing operation. |
| [options.compactionMap] | <code>compactionMap</code> |  | a function that can be used to custom map   unmappable values (or to throw an error when they are detected);   if this function returns `undefined` then the default behavior   will be used. |

Compact JSON-LD document with context.

**Returns**: <code>Promise.&lt;object&gt;</code> - Promise that resolves to the compacted document.  
<a name="module_jsonld..expand"></a>

### *jsonld*~expand(document, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| document | <code>object</code> |  | JSON-LD document to expand. |
| [options] | <code>object</code> | <code>{}</code> | the options of the expansion. |
| [options.base] | <code>string</code> |  | the base IRI to use. |
| [options.expandContext] | <code>object</code> |  | a context to expand with. |
| [options.keepFreeFloatingNodes] | <code>boolean</code> | <code>false</code> | true to keep free-floating   nodes, false not to |
| [options.documentLoader] | <code>documentLoader</code> |  | the document loader. |
| [options.expansionMap] | <code>expansionMap</code> |  | a function that can be used to   custom map unmappable values (or to throw an error when they are detected);   if this function returns `undefined` then the default behavior   will be used. |

Expand JSON-LD document and removes the context.

**Returns**: <code>Promise.&lt;object&gt;</code> - Promise that resolves to the expanded document.  
<a name="module_jsonld..canonize"></a>

### *jsonld*~canonize(input, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>object</code> |  | the input to normalize as JSON-LD or as a format specified by   the 'inputFormat' option. |
| [options] | <code>object</code> | <code>{}</code> | the options to use: |
| [options.algorithm] | <code>string</code> | <code>&quot;URDNA2015&quot;</code> | the normalization algorithm to use, `URDNA2015` or     `URGNA2012`. |
| [options.base] | <code>string</code> |  | the base IRI to use. |
| [options.expandContext] | <code>context</code> |  | a context to expand with. |
| [options.skipExpansion] | <code>boolean</code> | <code>false</code> | true to assume the input is expanded and skip     expansion, false not to, defaults to false. |
| [options.inputFormat] | <code>string</code> |  | the format if input is not JSON-LD:     'application/n-quads' for N-Quads. |
| [options.format] | <code>string</code> |  | the format if output is a string:     'application/n-quads' for N-Quads. |
| [options.documentLoader] | <code>documentLoader</code> |  | the document loader. |
| [options.useNative] | <code>boolean</code> | <code>false</code> | true to use a native canonize algorithm |

Performs RDF dataset normalization on the given input. The input is JSON-LD
unless the 'inputFormat' option is used. The output is an RDF dataset
unless the 'format' option is used.

**Returns**: <code>Promise.&lt;string&gt;</code> - a Promise that resolves to the normalized output.  
<a name="module_jsonld..generateRsaKeyPair"></a>

### *jsonld*~generateRsaKeyPair([options])

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> | Generate key pair options. |
| [options.bits] | <code>number</code> | Key length. |

Generate RSA key pair in PEM-formatted.

**Returns**: <code>object</code> - RSA Key pair.  
<a name="module_jsonld..signRsaSignature"></a>

### *jsonld*~signRsaSignature(document, publicKey, privateKeyPem, [options])

| Param | Type | Description |
| --- | --- | --- |
| document | <code>object</code> | JSON-LD document to be signed. |
| publicKey | <code>PublicKeyMeta</code> | Public key metadata. |
| privateKeyPem | <code>string</code> | PEM-formatted private key. |
| [options] | <code>object</code> | Options for signing the document. |
| [options.documentLoader] | <code>object</code> | Loader that retrieve external documents. |

Sign JSON-LD document with RSA crypto suite.

**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object represents signed JSON-LD document.  
<a name="module_jsonld..verifyRsaSignature"></a>

### *jsonld*~verifyRsaSignature(document, [options])

| Param | Type | Description |
| --- | --- | --- |
| document | <code>object</code> | JSON-LD document to be verify. |
| [options] | <code>object</code> | Options for verifying the signature. |
| [options.documentLoader] | <code>object</code> | Loader that retrieve external documents. |

Verify JSON-LD document signature.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - Promise object represents verification result.  
