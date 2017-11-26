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

## How to use

1. Clone this repository:
```
git clone https://github.com/TangleID/TangleID
```
2. Install and run:
```
npm install
npm run dev
```
A dev server will be served at `http://localhost:3000`

## How to customize

- Put pages/routes components in `pages` directory.
- Put react components in `components` directory.
- Put static assets in `static` directory.
