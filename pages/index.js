import React from "react";
import styled from "styled-components";
import Link from "next/link";

var nacl = require("tweetnacl");
nacl.util = require("tweetnacl-util");

export default class extends React.Component {
  state = {
    pair: {},
    string: "",
    sig: "",
    verified: "",
    message: "",
    encodedMessage: "",
    encodedPk: ""
  };

  generate = () => {
    var pair = nacl.sign.keyPair();
    console.log(pair);
    this.setState({ pair: pair });
  };

  sign = (msg, sk) => {
    var sig = nacl.sign.detached(nacl.util.decodeUTF8(msg), sk);
    console.log(sig);
    this.setState({ sig: sig });
    this.generatePacket(msg, sig);
  };

  generatePacket = (msg, sig) => {
    this.setState({
      packet: JSON.stringify({
        cert: msg,
        signature: nacl.util.encodeBase64(sig),
        issuer: "jeff"
      })
    });
  };

  verify = (sig, pk) => {
    var message = nacl.sign.open(
      nacl.util.decodeBase64(sig),
      nacl.util.decodeBase64(pk)
    );
    console.log(message);
    this.setState({ verified: message });
  };

  render() {
    var {
      pair,
      sig,
      verified,
      message,
      encodedMessage,
      encodedPk,
      packet
    } = this.state;
    return (
      <div>
        <Title>User details:</Title>
        <button onClick={() => this.generate()}>Generate</button>

        <div>
          Priv: {pair.secretKey && nacl.util.encodeBase64(pair.secretKey)}
        </div>
        <div>
          Pub: {pair.publicKey && nacl.util.encodeBase64(pair.publicKey)}
        </div>
        <Title>Message Signing:</Title>

        <div>
          <input
            type={"text"}
            value={message}
            onChange={e => this.setState({ message: e.target.value })}
          />
          <button onClick={() => this.sign(message, pair.secretKey)}>
            Sign
          </button>
        </div>
        <div>
          Msg + Sig: {sig && nacl.util.encodeBase64(sig)}
        </div>
        <div>
          packet: {packet && packet}
        </div>
        <Title>Verify Message:</Title>
        <input
          type={"text"}
          value={encodedMessage}
          placeholder={"Encoded Message"}
          onChange={e => this.setState({ encodedMessage: e.target.value })}
        />
        <input
          type={"text"}
          value={encodedPk}
          placeholder={"Message Public Key"}
          onChange={e => this.setState({ encodedPk: e.target.value })}
        />
        <div>
          Verified Message: {verified && nacl.util.encodeUTF8(verified)}
        </div>
        <button onClick={() => this.verify(encodedMessage, encodedPk)}>
          Verify
        </button>
      </div>
    );
  }
}

const Title = styled.h1`
  color: palevioletred;
  font-size: 24px;
`;
