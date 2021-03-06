# @tangleid/connect

The client side library that allow the interaction with `TangleID Client`.

## Getting Started

### Quick Start

Install using [npm](https://www.npmjs.org/):
```shell
npm install @tangleid/connect
```

or using [yarn](https://yarnpkg.com/):

```shell
yarn add @tangleid/connect
```

```javascript
import { Connect } from '@tangleid/connect';

const tangleID = new Connect({
  provider: 'http://demokits.biilabs.io:4600'
});

tangleID
  .requestCredentials()
  .then(credentials => {
    console.log(credentials);
  })
  .catch(error => {
    console.log(error);
  });
```

## API Reference

    <a name="module_connect..requestCredentials"></a>

### *connect*~requestCredentials()
Request for the necessary credentials from `TangleID Client`.

**Returns**: <code>Promise</code> - Promise object represents the credentials that given by cleint app.  
