import React from "react";
import styled from "styled-components";
import Link from "next/link";

import iota from "../libs/tanglecerts/iota";

export default class extends React.Component {
  state = {
    message: ""
  };

  componentDidMount() {
    // iota.attach({ test: true }, "TEST").then(data => console.log(data));
    // iota.getBundles("TEST", "");
  }

  render() {
    var { message } = this.state;
    return (
      <div>
        <div>
          <Link href="/new-user">Create user</Link>
        </div>
        <div>
          <Link href="/users">View users</Link>
        </div>
      </div>
    );
  }
}

const Title = styled.h1`
  color: palevioletred;
  font-size: 24px;
`;
