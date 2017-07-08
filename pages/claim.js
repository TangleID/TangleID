import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { webAttach } from "../libs/network";
import Certs from "../libs/tanglecerts";
import Iota from "../libs/tanglecerts/iota";

export default class extends React.Component {
  state = {
    issuerID: "",
    issuerSK: "",
    receiverID: "",
    message: "",
    packet: {}
  };

  sign = (issuerID, issuerSK, receiverID, message) => {
    var json = JSON.stringify({ statement: message });
    var signature = Certs.sign(json, issuerSK);
    var packet = Certs.generatePacket(issuerID, json, signature, receiverID);
    Iota.attach(packet, receiverID, "C").then(data => {
      alert("Attached");
      console.log(data);
    });
  };

  render() {
    var { issuerID, issuerSK, receiverID, message } = this.state;
    return (
      <div>
        <Title>Sign a Claim:</Title>
        <div>
          This allows a user to sign a claim about another user, sign it and
          attach it to the tangle
        </div>
        <div>It also saves the packet to a webDB for testing/inspection</div>
        <div>
          <input
            type={"text"}
            value={issuerID}
            placeholder={"Issuer's ID"}
            onChange={e => this.setState({ issuerID: e.target.value })}
          />
          <input
            type={"text"}
            value={issuerSK}
            placeholder={"Issuer's SK"}
            onChange={e => this.setState({ issuerSK: e.target.value })}
          />
        </div>
        <div>
          <input
            type={"text"}
            value={receiverID}
            placeholder={"Receiver's ID"}
            onChange={e => this.setState({ receiverID: e.target.value })}
          />
          <input
            type={"text"}
            value={message}
            placeholder={"Message"}
            onChange={e => this.setState({ message: e.target.value })}
          />
        </div>
        <div>
          <button
            onClick={() => this.sign(issuerID, issuerSK, receiverID, message)}
          >
            Sign & Attach
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
