import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { webAttach } from "../libs/network";
import Certs from "../libs/tanglecerts";
import QRcode from "qrcode.react";

import Layout from "../components/layout";

export default class extends React.Component {
  state = {
    pair: {},
    uuid: "",
    sig: "",
    first: "",
    last: "",
    packet: {},
    loading: false
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
    this.setState({ loading: true });
    Certs.iota.attach(user, uuid, "I").then(data => {
      this.setState({ loading: false });
    });
    user.sk = this.state.pair.secretKey;
    const url = "https://tangleidentity.firebaseio.com/users/" + uuid + ".json";
    webAttach(url, user);
  };

  render() {
    var { pair, sig, first, last, uuid, loading } = this.state;
    return (
      <Layout header={`User details:`}>
        <p>
          This generates a user's initial keyPair, signs a claim about their
          name, and then attaches it to the tangle.
        </p>
        <p>
          This proccess will be automated in the future when a user signs up to
          the service.
        </p>
        <Row>
          <Column flex={"1"}>
            UUID: <p>{uuid}</p>
          </Column>
          <Column flex={"2"}>
            Private Key:
            <QRcode
              value={JSON.stringify({
                sk: pair.secretKey
              })}
              size={200}
              level="H"
            />
            <p
              style={{
                maxWidth: 200,
                wordWrap: "break-word",
                fontSize: ".6rem"
              }}
            >
              {pair.secretKey && pair.secretKey}
            </p>
          </Column>
          <Column flex={"2"}>
            Public Key + UUID:
            <QRcode
              value={JSON.stringify({
                id: uuid,
                pk: pair.publicKey
              })}
              size={200}
              level="H"
            />
            <p
              style={{
                maxWidth: 200,
                wordWrap: "break-word",
                fontSize: ".6rem"
              }}
            >
              {pair.publicKey && pair.publicKey}
            </p>
          </Column>
        </Row>

        {!loading
          ? <Column>
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
                <button onClick={() => this.initialise()}>
                  Generate Again
                </button>

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
            </Column>
          : `loading`}
      </Layout>
    );
  }
}

const Title = styled.h1`
  color: palevioletred;
  font-size: 24px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Column = styled.div`
  display: flex;
  flex: ${props => (props.flex ? props.flex : "1")};
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
