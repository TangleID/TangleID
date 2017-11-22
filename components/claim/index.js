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
    opt: "",
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
    console.log(this.state.opt);
    if(this.state.opt === "C") {
        Certs.iota.attach(packet, this.props.receiver, "C").then(data => {
            this.setState({ loading: false });
            this.setState({ opt: "" });
        });
    } else if(this.state.opt === "R") {
        Certs.iota.attach(packet, this.props.receiver, "R").then(data => {
            this.setState({ loading: false });
            this.setState({ opt: "" });
        });
    } else if(this.state.opt === "M") {
        var bun = await Certs.iota.getBundles(this.props.receiver, "I");
        var recv_pubKey = bun[0].message.pk;
        packet.claim = Certs.encrypt(packet.claim, recv_pubKey);
        Certs.iota.attach(packet, this.props.receiver, "M").then(data => {
            console.log(data);
            this.setState({ loading: false });
            this.setState({ opt: "" });
        });
    }
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
                    <div>
                      <button onClick={() => {this.setState({opt: "C"}); this.sign(message)}}>
                          Sign & Attach
                      </button>
                      <button onClick={() => {this.setState({ opt: "R" }); this.sign(message)}}>
                          Sign & Revoke
                      </button>
                      <button onClick={() => {this.setState({ opt: "M" }); this.sign(message)}}>
                          Send private message
                      </button>
                    </div>
                  </Column>
                : `You need to act as a user to send a claim`}
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
