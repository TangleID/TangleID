import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { retrieve } from "../libs/network";
var nacl = require("tweetnacl");
nacl.util = require("tweetnacl-util");

export default class extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    var users = await retrieve(
      "https://tangleidentity.firebaseio.com/users.json"
    );
    var arr = [];
    Object.keys(users).map(key => {
      var user = users[key];
      user.id = key;
      arr.push(user);
    });
    this.setState({ users: arr });
    console.log(arr);
  };

  render() {
    var { users } = this.state;
    return (
      <div>
        Hello
        {users[0] &&
          users.map((c, index) =>
            <div key={index}>
              <div>
                {JSON.parse(c.assertion.message).firstName}{" "}
                {JSON.parse(c.assertion.message).lastName}
              </div>
              <div>
                Public Key: {c.pk}
              </div>
              <div>
                User ID: {c.id}
              </div>
            </div>
          )}
      </div>
    );
  }
}

const Title = styled.h1`
  color: palevioletred;
  font-size: 24px;
`;
