# TangleID

## Introduction

TangleID is a secure, easy-to-use system for self-sovereign identity,
built on IOTA/Tangle. An identity can be cryptographically linked to
offline data stores. Each identity is capable of storing the hash of
an attributed data blob, whether on Google Cloud, Azure, AWS, Dropbox,
etc., which is where all data associated with that identity is securely
stored.

Identities are capable of updating this file themselves, such as adding
a profile photo or a friend, or they can also grant others temporary
permission to read or write specific files. Since they can interact with
Tangle network, TangleID identities can also control digital bearer assets
such as cryptocurrencies or other tokenized assets.

## Use Case

* End-user

TangleID allows end-users to: own and control their personal identity,
reputation, data, and digital assets; securely and selectively disclose
their data to counterparties; access digital services without using
passwords; digitally sign claims, transactions, and documents; control and
send value on a Tangle; interact with decentralized operation logic; and
encrypt messages and data.

* Enterprise

TangleID allows enterprises to: establish a corporate identity; easily
onboard new customers and employees; establish an improved and transitive
Know-Your-Customer (KYC) process; build secure access-controlled
environments with less friction for employees; reduce liability by not
holding sensitive customer information; increase compliance; maintain a
network of vendors; establish role-specific, actor-agnostic identities
with specific permissions.

## Functionality

TangleID, an identity system, aims to be a flexible and easy-to-use method
of interacting with decentralized applications as well as off-Tangle
 identity related tasks by abstracting away the public key cryptography from
the end user to make the user experience intuitive.

A mobile app holds the user's private key and a certain address acts as
their identifier. We use a novel identity recovery mechanism to let the
user select friends from their contact list which gives a quorum of these
friends the ability to recover the identity of the user if their mobile
device is lost.

## Get started

### Setup environment

TangleID uses [swarm node](https://github.com/yillkid/iota-swarm-node) as backend to interact with Tangle.

- Create new file named `.env` and specify `IRI_HOST`, `SWARM_HOST` and `API_HOST`
  * `IRI_HOST`: an address (IP or domain) to the IRI node.
  * `SWARM_HOST`: an address (IP or domain) to the swarm node that implements the TangleID API.
  * `API_HOST`: main entry point for the API that TangleID invokes on client side.

```
IRI_HOST=http://node2.puyuma.org:8000
SWARM_HOST=http://node2.puyuma.org:8000
API_HOST=http://localhost:3000/api
```

You can modify these entries in file .env accordingly.

### Run TangleID
- [x] Build and launch TangleID service

```shell
$> npm install
```

- Development build
    ```shell
    $> npm run dev
    ```
- Production build
    ```shell
    $> npm run build && npm start
    ```

## Directory structure

## Dev note

- [x] Users Page(Temporary landing page): `/` or `/users`
  - [x] Fetch offtangle user list
  - [x] use login api to check
  - [ ] official auth flow

- [x] User Page: `/users/:id`
  - Basic information:
    - [x] QRCODE: `{ id: <uuid>, pk: <public key>}`
    - [x] private key
  - [x] List claims of specified user
    - [x] use get all claims api: [doc](https://hackmd.io/s/Sku7aPFkM#)
  - [x] Make claim of specified user
    - [x] sign and attach input
    - [x] use new claim api: [doc](https://hackmd.io/s/HJyzQvF1z)

- [x] New User Page: `/users/new`
  - prepare
    - [x] retrieve key pairs
    - [x] create uuid
  - [x] Create new user
    - [x] send previous as body to new user api([doc](https://hackmd.io/s/BkB03arJz))
    - [ ] error handling (No error message from back-end)

## Licensing
TangleID is freely redistributable under the MIT License. Use of this source
code is governed by a MIT-style license that can be found in the `LICENSE` file.
