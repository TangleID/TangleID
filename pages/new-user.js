import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { attach } from "../libs/network";
var nacl = require("tweetnacl");
nacl.util = require("tweetnacl-util");

export default class extends React.Component {
  state = {
    pair: {},
    uuid: "",
    sig: "",
    first: "",
    last: ""
  };

  componentDidMount() {
    this.generate();
    this.uuid();
  }

  generate = () => {
    var pair = nacl.sign.keyPair();
    console.log(pair);
    this.setState({ pair: pair });
  };

  uuid = () => {
    var ALPHABET =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var ID_LENGTH = 13;
    var rtn = "";
    for (var i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    console.log(rtn);
    this.setState({ uuid: rtn });
  };

  sign = (msg, sk) => {
    var sig = nacl.sign.detached(nacl.util.decodeUTF8(msg), sk);
    console.log(sig);
    this.setState({ sig: sig, msg: msg });
  };

  save = () => {
    const url =
      "https://tangleidentity.firebaseio.com/users/" +
      this.state.uuid +
      ".json";
    const user = {
      assertion: {
        message: this.state.msg,
        signature: nacl.util.encodeBase64(this.state.sig)
      },
      pk: nacl.util.encodeBase64(this.state.pair.publicKey)
    };
    attach(url, user);
  };

  render() {
    var { pair, sig, first, last, uuid } = this.state;
    return (
      <div>
        <Title>User details:</Title>
        <div>
          UUID: {uuid}
        </div>
        <div>
          Priv: {pair.secretKey && nacl.util.encodeBase64(pair.secretKey)}
        </div>
        <div>
          Pub: {pair.publicKey && nacl.util.encodeBase64(pair.publicKey)}
        </div>
        <button onClick={() => this.generate()}>Generate</button>

        <div>
          <input
            type={"text"}
            value={first}
            placeholder={"First Name"}
            onChange={e => this.setState({ first: e.target.value })}
          />
          <input
            type={"text"}
            value={last}
            placeholder={"Last Name"}
            onChange={e => this.setState({ last: e.target.value })}
          />
        </div>
        <div>
          <button
            onClick={() =>
              this.sign(
                JSON.stringify({ firstName: first, lastName: last }),
                pair.secretKey
              )}
          >
            Sign
          </button>
        </div>
        <div>
          <button onClick={() => this.save()}>Save user</button>
        </div>
      </div>
    );
  }
}

const Title = styled.h1`
  color: palevioletred;
  font-size: 24px;
`;
