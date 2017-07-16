import React from "react";
import styled from "styled-components";
import Link from "next/link";

export default props =>
  <Wrapper>
    <Header>
      <Link href="/">
        <Logo>tanglecerts</Logo>
      </Link>
      <Nav>
        <Link href="/">
          <NavItem>Users</NavItem>
        </Link>
        <Link href="/new-user">
          <NavItem>New User</NavItem>
        </Link>
        {/* <NavItem>
          {localStorage && JSON.parse(localStorage.getItem("user")).name
            ? "Acting as " + JSON.parse(localStorage.getItem("user")).name
            : null}
        </NavItem> */}
      </Nav>
    </Header>
    <Container>
      <Chead>
        {props.header || `Loading`}
      </Chead>
      {props.children}
    </Container>
    <Header />
  </Wrapper>;

const Wrapper = styled.section`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: space-between;

  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  background: #339989;
`;
const Header = styled.header`
  color: #fffafb;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 0rem;
`;

const Logo = styled.div`
  color: #131515;
  font-family: Avenir;
  padding: 0rem 1rem;
  font-size: 1.3rem;
  width: 100%;
`;
const Chead = styled.div`
  color: #131515;
  font-family: Avenir;
  padding: 1.3rem 1rem .8rem;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  width: 100%;
  border-bottom: 2px solid #339989;
`;

const Nav = styled.nav`
  max-width: 600px;
  padding: 0rem 3rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const NavItem = styled.a`
  margin: 0rem 1rem;
  text-decoration: none;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background: #fffafb;
  padding: 0 3rem 0;
  margin: 4rem 0;
  height: auto;
  min-height: 30vh;
  width: auto;
  min-width: 70vw;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
