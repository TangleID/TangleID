# @tangleid/credential

Utilities for generating credential.

## Installation

Install using [npm](https://www.npmjs.org/):

```shell
npm install @tangleid/credential
```

or using [yarn](https://yarnpkg.com/):

```shell
yarn add @tangleid/credential
```

## API Reference

<a name="module_credential..generateCredential"></a>

### *credential*~generateCredential(params)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Parameters for generating the credential object. |
| params.subject | <code>object</code> |  | Subject of the credential. |
| [params.metadata] | <code>object</code> | <code>{}</code> | Metadata of the credential. |
| [params.context] | <code>object</code> | <code>[&#x27;https://www.w3.org/2018/credentials/v1&#x27;]</code> | Context URLs of the credential. |
| [params.alias] | <code>object</code> | <code>{}</code> | Context alias of the credential. |

Generate credential object.

**Returns**: <code>object</code> - Credential object in JSON-LD format.  
