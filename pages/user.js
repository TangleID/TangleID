import React from "react";
import styled from "styled-components";
import Link from "next/link";

import Layout from "../components/layout";
import Claim from "../components/claim";

import { webReceieve } from "../libs/network";
import Certs from "../libs/tanglecerts";

import QRcode from "qrcode.react";

export default class extends React.Component {
  state = {};

  componentDidMount() {
    this.getData(this.props.url.query.user);
  }

  getData = async key => {
    console.log("Getting bundles for: ", key);

    var initial = await Certs.iota.getBundles(key, "I"); // Get all inital Claims
    var claims = await Certs.iota.getBundles(key, "C"); // Get all regular Claims
    var revokes = await Certs.iota.getBundles(key, "R"); // Get all claim revocations
    console.log("Users initial claim: ");
    console.log(initial[0]);

    this.getTxHash(revokes);
    // Get the issuer of the claims
    this.getIssuer(claims);

    this.setState({ initial });
  };

  getTxHash = async revokes => {
      var updatedRevokeHash = [];
      var revokeTxHash = [];
      revokes.map(async revoke => {
          console.log(revoke);
          updatedRevokeHash.push(JSON.parse(revoke.message.claim).statement);
          revokeTxHash.push(revoke.hash);
          this.setState({ revokesTarget: updatedRevokeHash, 
                          revokesHash: revokeTxHash });
      });
      if (updatedRevokeHash[0]) console.log("Found Revocations!");
  };

  getIssuer = async claims => {
    var updatedClaims = [];
    var updatedRevoke = [];
    var i;
    claims.map(async claim => {
      var issuer = await Certs.iota.getBundles(claim.message.issuer, "I");
      var filledClaim = claim;
      filledClaim.message.issuer = issuer[0].message;

      if(this.state.revokesTarget && (i = this.state.revokesTarget.indexOf(claim.hash)) > -1) {
        console.log("origin: " + filledClaim.hash);

        filledClaim.hash = this.state.revokesHash[i]; 
        console.log("revoke: " + filledClaim.hash);
        updatedRevoke.push(filledClaim);
        this.setState({ revokes: updatedRevoke });
      } else {
        updatedClaims.push(filledClaim);
        this.setState({ claims: updatedClaims });
      }
    });
    if (updatedClaims[0]) console.log("Found claims about this user!");
  };

  render() {
    var { initial, claims, revokes } = this.state;
    return (
      <Layout
        header={
          initial &&
          JSON.parse(initial[0].message.claim).firstName +
            " " +
            JSON.parse(initial[0].message.claim).lastName
        }
      >
        <Row>
          {initial
            ? <Column>
                <div>Public Key + UUID</div>
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

                <div style={{ width: 200, wordWrap: "break-word" }}>UUID:</div>
                <div
                  style={{
                    width: 200,
                    wordWrap: "break-word",
                    fontSize: ".6rem",
                    paddingBottom: 20
                  }}
                >
                  {initial[0].message.id}
                </div>
                <div style={{ width: 200, wordWrap: "break-word" }}>
                  Secret Key (saved testing):
                </div>
                <div
                  style={{
                    width: 200,
                    wordWrap: "break-word",
                    fontSize: ".6rem",
                    paddingBottom: 20
                  }}
                >
                  {initial[0].message.sk}
                </div>
                <button
                  onClick={() =>
                    localStorage.setItem(
                      "user",
                      JSON.stringify({
                        name:
                          JSON.parse(initial[0].message.claim).firstName +
                          " " +
                          JSON.parse(initial[0].message.claim).lastName,
                        id: initial[0].message.id,
                        sk: initial[0].message.sk
                      })
                    )}
                >
                  Act as user
                </button>
              </Column>
            : `Loading`}

          <Column flex={"2"}>
            <h3>Make Claim about User:</h3>
            {initial && <Claim receiver={initial[0].message.id} />}
            <h3>Claims about this user:</h3>
            {claims &&
              claims.map((claim, index) =>
                <Column
                  key={index}
                  style={{ borderBottom: "1px solid #131515" }}
                >
                  <div>
                    Issuer:{" "}
                    {JSON.parse(claim.message.issuer.claim).firstName +
                      " " +
                      JSON.parse(claim.message.issuer.claim).lastName}
                  </div>
                  <Row>
                    <div>
                      Claim: {JSON.parse(claim.message.claim).statement}
                    </div>
                    <div>
                      {Certs.verify.claim(
                        claim.message.claim,
                        claim.message.signature,
                        claim.message.issuer.id
                      )
                        ? "Verified"
                        : "Failed"}
                    </div>
                  </Row>
                  <div>
                    Hash:{" "}
                    {claim.hash}
                  </div>
                </Column>
              )}
              <h3> Revocations about this user:</h3>
              {revokes &&
               revokes.map((revoke, index) =>
                    <Column
                      key={index}
                      style={{ borderBottom: "1px solid #131515" }}
                     >
                     <div>
                        Issuer:{" "}
                        {JSON.parse(revoke.message.issuer.claim).firstName +
                          " " +
                         JSON.parse(revoke.message.issuer.claim).lastName}
                     </div>
                     <Row>
                        <div>
                         Claim: {JSON.parse(revoke.message.claim).statement}
                         </div>
                         <div>
                            <font color="red">Revoked</font>
                         </div>
                      </Row>
                     <div>
                        Hash:{" "}
                        {revoke.hash}
                    </div>
                    </Column>
                )}
          </Column>
        </Row>
      </Layout>
    );
  }
}

const Column = styled.div`
  display: flex;
  flex: ${props => (props.flex ? props.flex : "1")};
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 0rem;
  width: 100%;
`;

const UserBox = styled.div`padding: 20px;`;

const Title = styled.h1`
  color: palevioletred;
  font-size: 24px;
`;
