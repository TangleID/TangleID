import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import configureStore from '../store/configureStore';
import DrawerLayout from '../layouts/DrawerLayout';
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
    tangleid.api.fetchUserList().then((userList) => {
      this.setState({ userList });
    });
  }

  render() {
    return (
      <DrawerLayout>
        <h2>Users</h2>
        {
          this.state.userList
            ? <UserList users={this.state.userList} />
            : null
        }
      </DrawerLayout>
    );
  }
}

UsersPage.getInitialProps = async (context) => {
  const { isServer } = context;
  return { isServer };
};

const mapStateToProps = state => state;

export default withRedux(configureStore, mapStateToProps)(UsersPage);

