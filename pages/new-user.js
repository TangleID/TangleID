import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { webAttach } from "../libs/network";
import Certs from "../libs/tanglecerts";
import Iota from "../libs/tanglecerts/iota";

export default class extends React.Component {
  state = {
    pair: {},
    uuid: "",
    sig: "",
    first: "",
    last: "",
    packet: {}
  };

  componentDidMount() {
    this.initialise();
  }

  initialise = () => {
    const pair = Certs.generate();
    const uuid = Certs.uuid();
    this.setState({ pair: pair, uuid: uuid });
  };

  sign = (msg, sk) => {
    var sig = Certs.sign(msg, sk);
    var packet = Certs.generateInitalPacket(
      this.state.uuid,
      msg,
      sig,
      this.state.pair.publicKey
    );
    this.setState({ sig: sig, packet: packet, msg: msg });
    this.save(packet, this.state.uuid);
  };

  save = (user, uuid) => {
    const url = "https://tangleidentity.firebaseio.com/users/" + uuid + ".json";
    webAttach(url, user);
    Iota.attach(user, uuid).then(data => {
      alert("Attached");
      console.log(data);
    });
  };

  render() {
    var { pair, sig, first, last, uuid } = this.state;
    return (
      <div>
        <Title>User details:</Title>
        <div>
          In this example a user generates their keyPair, signs a claim about
          their name, and then attaches it to the tangle.
        </div>
        <div>It also saves the packet to a webDB for testing/inspection</div>
        <button onClick={() => this.initialise()}>Generate Again</button>
        <div>
          UUID: {uuid}
        </div>
        <div>
          Priv: {pair.secretKey && pair.secretKey}
        </div>
        <div>
          Pub: {pair.publicKey && pair.publicKey}
        </div>

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
            Save user
          </button>
        </div>
      </div>
    );
  }
}

const Title = styled.h1`
  color: palevioletred;
  font-size: 24px;
`;
