import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import configureStore from '../store/configureStore';
import Layout from '../layouts/material/Main';
import UserList from '../components/UserList';

import tangleid from '../utils/tangleidSetup';

class UsersPage extends Component {
  constructor() {
    super();
    this.state = {
      userList: [],
    };
  }

  componentDidMount() {
    tangleid.local.fetchUserList().then((userList) => {
      this.setState({ userList });
    });
  }

  render() {
    return (
      <Layout>
        <h2>Users</h2>
        {
          this.state.userList
            ? <UserList users={this.state.userList} />
            : null
        }
      </Layout>
    );
  }
}

UsersPage.getInitialProps = async (context) => {
  const { isServer } = context;
  return { isServer };
};

const mapStateToProps = state => state;

export default withRedux(configureStore, mapStateToProps)(UsersPage);

