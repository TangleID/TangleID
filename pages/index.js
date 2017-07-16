import React from "react";
import styled from "styled-components";
import Link from "next/link";

import Layout from "../components/layout";

import { webReceieve } from "../libs/network";
import Certs from "../libs/tanglecerts";

export default class extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    console.log("Getting list of users from the internet.");
    var users = await webReceieve(
      "https://tangleidentity.firebaseio.com/users.json"
    );
    var arr = [];
    var keys = [];
    Object.keys(users).map(key => {
      keys.push(key);
    });
    console.log("Searching/Retreiving their bundles from the tangle");

    keys.map(key =>
      Certs.iota.getBundles(key, "I").then(data => {
        var state = this.state.users;
        data.map(item => {
          console.log("Found User: ", item.message.id);
          state.push(item.message);
        });
        if (data[0]) this.setState({ users: state });
      })
    );
  };

  render() {
    var { users } = this.state;
    return (
      <Layout header={`Users`}>
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
        <div
          style={{ padding: 10 }}
        >{`These are being retreived live from the tangle`}</div>
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
