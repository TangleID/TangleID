import React from "react";
import styled from "styled-components";
import Link from "next/link";
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
    var users = await webReceieve(
      "https://tangleidentity.firebaseio.com/users.json"
    );
    var arr = [];
    var keys = [];
    Object.keys(users).map(key => {
      var user = users[key];
      user.id = key;
      keys.push(user.id);
    });

    console.log(keys);
    keys.map(key =>
      Certs.iota.getBundles(key).then(data => {
        var state = this.state.users;
        console.log(data);
        if (data[0]) state.push(data[0].message);
        this.setState({ users: state });
      })
    );
  };

  render() {
    var { users } = this.state;
    return (
      <div>
        List of user IDs from the internet & then all data fetched from the
        tangle.
        {users[0] &&
          users.map((c, index) =>
            <UserBox key={index}>
              <div>
                User ID: {c.id}
              </div>
              <div>
                Claim: {c.claim}
              </div>
              <div>
                Claim Sig.: {c.signature}
              </div>
              <div>
                Verified:{" "}
                {Certs.verify(c.claim, c.signature, c.pk)
                  ? "Success"
                  : "Failed"}
              </div>
            </UserBox>
          )}
      </div>
    );
  }
}

const UserBox = styled.div`padding: 20px;`;

const Title = styled.h1`
  color: palevioletred;
  font-size: 24px;
`;
