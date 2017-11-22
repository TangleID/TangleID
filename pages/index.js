import React from "react";
import styled from "styled-components";
import Link from "next/link";

import Layout from "../components/layout";

import { webReceieve } from "../libs/network";
import Certs from "../libs/tanglecerts";



export default class extends React.Component {
  state = {
    users: [],
    orgs: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    console.log("Getting list of users from the internet.");

    var users = await webReceieve(
      "https://tangleidentity.firebaseio.com/users.json"
    );
    var orgs = await webReceieve(
      "https://tangleidentity.firebaseio.com/organizations.json"
    );
    var keys = [];
    Object.keys(users).map(key => {
      keys.push(key);
    });
    console.log("Searching/Retreiving users' bundles from the tangle");

    keys.map(key =>
      Certs.iota.getBundles(key, "I").then(data => {
        var state = this.state.users;
        data.map(item => {
          if(item.message){
            console.log(key, item);
            console.log("Found User: ", item.message.id);
            state.push(item.message);
          }
        });
        if (data[0]) this.setState({ users: state });
      }));

    var orgKeys = [];
    Object.keys(orgs).map(key => {
      orgKeys.push(key);
    });
    console.log("Searching/Retreiving organizations' bundles from the tangle");

    orgKeys.map(key =>
      Certs.iota.getBundles(key, "O").then(orgdata => {
          var orgstate = this.state.orgs;
          orgdata.map(item => {
              console.log("Found Org: ", item.message.id);
              orgstate.push(item.message);
          });
          if (orgdata[0]) this.setState({ orgs: orgstate });
    }));
  };

  render() {
    var { users, orgs } = this.state;
    return (
      <Layout header={`List`}>
        <h3>Users</h3>
        {users[0]
          ? users.map((c, index) =>
              <Link href={{ pathname: "user", query: { user: c.id } }}>
                <UserBox key={index}>
                  <strong>
                    {JSON.parse(c.claim).firstName}{" "}
                    {JSON.parse(c.claim).lastName}
                  </strong>
                  <Row>
                    <div>
                      Claim: {c.claim}
                    </div>
                    <div>
                      Initial Claim:{" "}
                      {Certs.verify.initial(c.claim, c.signature, c.pk)
                        ? "Valid"
                        : "Invalid"}
                    </div>
                  </Row>
                </UserBox>
              </Link>
            )
          : `loading`}
          <h3>Organizations</h3>
          {orgs[0]
            ? orgs.map((c, index) =>
                <Link href={{ pathname: "organization", query: { user: c.id } }}>
                  <UserBox key={index}>
                    <strong>
                      {JSON.parse(c.claim).orgName}
                    </strong>
                    <Row>
                      <div>
                        Claim: {c.claim}
                      </div>
                      <div>
                        Initial Claim:{" "}
                        {Certs.verify.initial(c.claim, c.signature, c.pk)
                          ? "Valid"
                          : "Invalid"}
                      </div>
                    </Row>
                  </UserBox>
                </Link>
              )
            : `loading`}
          <div
            style={{ padding: 10 }}
          >{`There are being retreived live from the tangle`}</div>
      </Layout>
    );
  }
}

const UserBox = styled.div`
  width: 100%;
  padding: 20px;
  border-bottom: 2px solid #339989;
`;

const Title = styled.h1`
  color: palevioletred;
  font-size: 24px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;
