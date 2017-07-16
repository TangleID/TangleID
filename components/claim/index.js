import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { webAttach } from "../../libs/network";
import Certs from "../../libs/tanglecerts";

export default class extends React.Component {
  state = {
    issuerID: "",
    issuerSK: "",
    message: "",
    packet: {},
    loading: false
  };

  sign = async message => {
    var local = JSON.parse(await localStorage.getItem("user"));

    var json = JSON.stringify({ statement: message });
    var signature = Certs.sign(json, local.sk);
    var packet = Certs.generatePacket(
      local.id,
      json,
      signature,
      this.props.receiver
    );

    this.setState({ loading: true });
    Certs.iota.attach(packet, this.props.receiver, "C").then(data => {
      this.setState({ loading: false });
    });
  };

  render() {
    var { issuerID, issuerSK, message, loading } = this.state;
    return (
      <Column>
        {!loading
          ? <Column>
              {localStorage.getItem("user")
                ? <Column>
                    Acting as: {JSON.parse(localStorage.getItem("user")).name}
                    <input
                      type={"text"}
                      value={message}
                      placeholder={"Message"}
                      onChange={e => this.setState({ message: e.target.value })}
                    />
                    <button onClick={() => this.sign(message)}>
                      Sign & Attach
                    </button>
                  </Column>
                : `You need to act as a user to send a message`}
            </Column>
          : `Attaching to tangle. Can take a 30s. Refresh when done.`}
      </Column>
    );
  }
}

const Title = styled.h1`
  color: palevioletred;
  font-size: 24px;
`;

const Column = styled.div`
  display: flex;
  flex: ${props => (props.flex ? props.flex : "1")};
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
