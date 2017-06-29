import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Title = styled.h1`
  color: rebeccapurple;
  font-size: 50px;
`;

export default () => (
  <div>
    <Title>My page</Title>
    <div>Click <Link href="/about"><a>here</a></Link> to read more</div>
  </div>
);
