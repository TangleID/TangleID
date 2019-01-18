# TangleID Connect

This project is the client side library that allow you interact with `TangleID Client`.

## Getting Started

### Quick Start

```shell
 $ npm install @tangleid/connect
 or
 $ yarn add @tangleid/connect
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
