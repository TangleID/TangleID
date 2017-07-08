import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { webReceieve } from "../libs/network";
import Certs from "../libs/tanglecerts";

import QRcode from "qrcode.react";

export default class extends React.Component {
  state = {};

  componentDidMount() {
    this.getData(this.props.url.query.user);
  }

  getData = async key => {
    var initial = await Certs.iota.getBundles(key, "I"); // Get all inital Claims
    var claims = await Certs.iota.getBundles(key, "C"); // Get all regular Claims
    var revokes = await Certs.iota.getBundles(key, "R"); // Get all claim revocations
    console.log(initial);
    this.setState({ initial, claims, revokes });
  };

  render() {
    var { initial, claims, revokes } = this.state;
    return (
      <Wrapper>
        {initial
          ? <Column>
              <h1>
                {JSON.parse(initial[0].message.claim).firstName}{" "}
                {JSON.parse(initial[0].message.claim).lastName}
              </h1>
              <div>
                ID: {initial[0].message.id}
              </div>
              <div>Public Key</div>
              <div>
                <QRcode
                  value={JSON.stringify({
                    id: initial[0].message.id,
                    pk: initial[0].message.pk
                  })}
                  size={200}
                  level="H"
                />
              </div>
            </Column>
          : `Loading`}
        {claims
          ? <Column>
              <Row>
                <h3>Claims about this user:</h3>
              </Row>
              {claims.map(claim =>
                <Row>
                  <div style={{ padding: 20 }}>
                    <div>
                      Issuer: {claim.message.issuer}
                    </div>
                    <div>
                      Claim: {JSON.parse(claim.message.claim).statement}
                    </div>
                    <div>
                      {/*Signature: {claim.message.signature}*/}
                    </div>
                  </div>
                </Row>
              )}
            </Column>
          : null}
      </Wrapper>
    );
  }
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 0 auto;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const UserBox = styled.div`padding: 20px;`;

const Title = styled.h1`
  color: palevioletred;
  font-size: 24px;
`;
