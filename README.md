# TangleID

# Get started

- Create a `.env` file, and specify `OFF_TANGLE_USERS_LINK` and `HOST_API`
  - `BACK_END_API`: Server will provide a proxy to bypass CORS.
  - `HOST_API`: The api endpoint of tangleID will call on client.

```
BACK_END_API=http://node0.puyuma.org/tangleid_backend/api/
HOST_API=http://localhost:3000/api
```

```
$> npm install
```

For dev:

```
$> npm run dev
```

For production build:

```
$> npm run build && npm start
```

# Directory structure

# Dev note

- [x] Users Page(Temporary landing page): `/` or `/users`
  - [x] Fetch offtangle user list
  - [x] use login api to check
  - [ ] official auth flow (Need to discuss with @yillkid)

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
