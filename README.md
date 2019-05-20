# TangleID Core
> TangleID JavaScript monorepo

[![Build Status](https://travis-ci.org/TangleID/TangleID.svg?branch=develop)](https://travis-ci.org/TangleID/TangleID)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

This is the TangleID JavaScript library, which allows you to do the following:
- Registering and resolving [identifier](https://w3c-ccg.github.io/did-spec/)
- Signing JSON-LD document, e.g. [Verifiable Credentials](https://w3c.github.io/vc-data-model/)
- Verifying JSON-LD document signature

For more use cases, please visit the [TangleID website](https://tangleid.github.io/).

## Installing the library

To install the TangleID library and its dependencies, you can use one of the following options:

Install using [npm](https://www.npmjs.org/):

```shell
npm install @tangleid/core
```

or using [yarn](https://yarnpkg.com/):

```shell
yarn add @tangleid/core
```

## Getting started

To register/resolve the identifier, do the following:

```javascript
import { composeAPI } from '@tangleid/core';

const tid = composeAPI({
  providers: {
    // mainnet IRI
    '0x1': 'http://node.deviceproof.org:14265',
    // devnet IRI
    '0x2': 'https://nodes.devnet.thetangle.org:443',
  },
});

const { seed, did, document } = await tid.registerIdentity({
  network: '0x1',
  publicKey,
});

const resolved = await tid.resolveIdentity(did);
```

The API Reference can be found in [here](packages/core#api-reference).

## Contributing

### Bootstrap your environments

1. Clone this repository.
```shell
$ git clone https://github.com/TangleID/TangleID
```

2. Install the dependency packages.
```shell
$ yarn run init
```

 ### Running tests

 ```shell
 $ yarn run test
 ```

 ### Build the packages

 ```shell
 $ yarn run build
 ```

 ### Updating documentation

 The documentation is generated from the [`JSDoc`](http://usejsdoc.org) annotations. To update the documentation running `yarn run docs` from the root directory.

## Licensing

TangleID is freely redistributable under the MIT License. Use of this source
code is governed by a MIT-style license that can be found in the `LICENSE` file.
