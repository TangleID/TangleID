import React from "react";
import styled from "styled-components";
import Link from "next/link";

import sjcl from "../sjcl/sjcl.js";

export default class extends React.Component {
  state = {
    pair: {},
    string: "",
    sig: ""
  };

  generate = () => {
    console.log(sjcl.ecc);
    var pair = sjcl.ecc.ecdsa.generateKeys(256);
    console.log(pair);
    this.setState({ pair: pair });
  };

  render() {
    return (
      <div>
        <div>Click <Link href="/about"><a>here</a></Link> to read more</div>
        <div>Pub: {this.state.pair.pub}</div>
        <div>Sig: {this.state.sig}</div>
        <button onClick={() => this.generate()}>Generate</button>
        <button onClick={() => this.sign()}>Sign</button>
        <button onClick={() => this.verify()}>Verify</button>
      </div>
    );
  }
}

const Title = styled.h1`
  color: rebeccapurple;
  font-size: 50px;
`;
