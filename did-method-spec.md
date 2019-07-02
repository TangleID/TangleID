# TangleID DID Method Specification

## About

The TangleID DID method specification conforms to the requirements specified in the DID specification currently published by the W3C Credentials Community Group. For more information about DIDs and DID method specifications, please see the [DID Primer](https://github.com/WebOfTrustInfo/rwot5-boston/blob/master/topics-and-advance-readings/did-primer.md) and [DID Spec](https://w3c-ccg.github.io/did-spec/).

## Abstraction

IOTA is a public distributed ledger that utilizes an invention called the Tangle at its core, address scalability issues and having no transaction fee, that encourages adoption of the technology in the industry. TangleID is intended to implement DIDs and DID Documents.

![](https://i.imgur.com/N8XIr6s.png)

TangleID also optimizes MAM for key management and related features across the Tangle. Masked Authenticated Messaging (MAM) is a data communication protocol which adds functionality to broadcast and access data streams over the Tangle which adds integrity to these message streams. The owner of seed in MAM is able to create a channel structure like above to transfer the messages. TangleID stores and manages corresponding DID Documents on the MAM channels, and use the initial channel id as the DID’s `idstring`, each revision of the DID document is recorded on the message of the endpoint afterward.

![](https://i.imgur.com/t9wsGR7.png)

Those messages can be represented as a message queue.

## Target System

The target system is the IOTA network. This can either be:

- Tangle on Mainnet
- Tangle on Devnet

It is also possible to build on top of [Bee](https://github.com/iotaledger/bee), an IOTA Control agenT (ICT), as long as interface module to interact with it is complete. With IOTA as the target system, TangleID DID can have adventages as below:

- No transaction fee on entire DID specification
- Uses IOTA's built-in account abstraction
- Multi-signature for identity owner
- Decoupling credentials from the underlying identity
- Decoupling IOTA interaction from the underlying identity
- Flexibility to use key management

## DID Method Name

The namestring that shall identify this DID method is `tangle`

A DID that uses this method MUST begin with the following prefix: `did:tangle`. Per the DID specification, this string MUST be in lowercase. The remainder of the DID, after the prefix, is specified below.

## Method Specific Identifier

The TangleID DID schema is defined by the following [ABNF](ftp://ftp.rfc-editor.org/in-notes/std/std68.txt):

```abnf
tangleid-did = "did:tangle:" idstring *(":" subnamespace)
idstring = 81 *(trytes)
subnamespace = ALPHA *(ALPHA / DIGIT / "_" / "-")
trytes = "9" / "A" / "B" / "C" / "D" / "E" / "F" / "G" / "H" / "I" / "J"
       / "K" / "L" / "M" / "N" / "O" / "P" / "Q" / "R" / "S" / "T" / "U"
       / "V" / "W" / "X" / "Y" / "Z"
```

Optional one or more sub namespaces may be specified to indicate which TangleID system the DID should reference.

### Example

A valid TangleID DID might be:

```
did:tangle:WILTZRGRVPLUGPSMSIGXQZQPBASRINLNGJOU99SRMADCFKIZYUYDDWQVXXDC9MIX9BJVSRGIQ99NA9999
```

## CRUD Operation Definitions

### Create (Register)

In order to create a unique `tangle` DID, an initial channel needs to be generated with Merkle-tree Signature Scheme on top of Winternitz One-Time Signature. At this point, no interaction with the target Tangle network is required. The registration is implicit as it is impossible to brute force the seed and create the same channel from one and another. The owner of the seed is the entity identified by the DID.

The minimal DID document for an identifier of initial channel, e.g., `WILTZRGRVPLUGPSMSIGXQZQPBASRINLNGJOU99SRMADCFKIZYUYDDWQVXXDC9MIX9BJVSRGIQ99NA9999` looks like this and is equivalent to a IOTA transaction:

```jsonld
{
  "@context": "https://w3id.org/did/v1",
  "id": "did:tanlge:WILTZRGRVPLUGPSMSIGXQZQPBASRINLNGJOU99SRMADCFKIZYUYDDWQVXXDC9MIX9BJVSRGIQ99NA9999",
  "authentication": [
    "did:example:123456789abcdefghi#keys-1"
  ]
  "publicKey": [{
    "id": "did:tanlge:WILTZRGRVPLUGPSMSIGXQZQPBASRINLNGJOU99SRMADCFKIZYUYDDWQVXXDC9MIX9BJVSRGIQ99NA9999#keys-1",
    "type": "RsaVerificationKey2018",
    "controller": "did:tanlge:WILTZRGRVPLUGPSMSIGXQZQPBASRINLNGJOU99SRMADCFKIZYUYDDWQVXXDC9MIX9BJVSRGIQ99NA9999",
    "publicKeyPem": "-----BEGIN PUBLIC KEY...END PUBLIC KEY-----\r\n"
  }]
}
```

### Read (Resolve)

A Tangle ID DID document can be retrieved directly by the TangleID DID from Tangle. The latest document can be looked up at the end of the message queue. All records are under the channel which is also and IOTA address, and the message can be trusted and validated by its signature in the transaction. Multi-signature is also possible if there are multiple validators while it will certainly increase the message length and transactions needed in the bundle.

### Update (Replace)

To update the DID document, the owner of the DID should append the new DID document as the message to the message queue. This can be under the same MAM channel which means a new endpoint is generated for the new document, or a whole new channel if endpoints are used up.

### Delete (Revoke)

Consider the DID document in a message queue is like a linked list as operations mentioned in Update (Replace) section. In order to revoke the document of the DID document, the owner of the DID just need to send the empty object to the message queue and attach the MAM private key to this message. All the queries afterward in this channel would be considered as invalid. This means messages can't be resolved and even get serialized.

```json
{}
```

## Security Considerations

- The seed which is equal to the private key **MUST** be stored on the client-side.
- The channel generation **MUST** be an offline operation and do not require a network connection. Therefore, it’s impossible to brute force the seed and create the same channel from one and another.

## Reference

- [DID Method Registry](https://w3c-ccg.github.io/did-method-registry/)
