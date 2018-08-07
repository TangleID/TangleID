import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';

import configureStore from '../../store/configureStore';
import updateLocalAccount from '../../actions/updateLocalAccount';
import Layout from '../../layouts/material/Main';
import NewUserForm from '../../components/NewUserForm';
import { generateKeyPair } from '../../utils/tools';
import tangleid from '../../utils/tangleidSetup';

const generateUUID = () => {
  const validChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
  let ret = '';
  for (let i = 0; i < 26; i += 1) { ret = ret.concat(validChar[Math.floor(Math.random() * 27)]); }
  return ret;
};

class NewUserPage extends Component {
  constructor() {
    super();
    const uuid = generateUUID();
    const keyPairs = generateKeyPair();

    this.state = {
      uuid, keyPairs,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const params = Object.assign({ pk: this.state.keyPairs.pk }, values);
    tangleid.api.createIdentity(this.state.uuid, params)
      .then((txHash) => {
        console.log('Identity created:', txHash);
        const account = {
          claim: values,
          id: this.state.uuid,
          sk: this.state.keyPairs.sk,
          pk: this.state.keyPairs.pk,
        };
        this.props.updateLocalAccount(account);
      });
  }

  render() {
    return (
      <Layout>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <NewUserForm
            keyPairs={this.state.keyPairs}
            uuid={this.state.uuid}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </Layout>
    );
  }
}

NewUserPage.propTypes = {
  updateLocalAccount: PropTypes.func,
};

NewUserPage.getInitialProps = async (context) => {
  const { isServer } = context;
  return { isServer };
};

const mapDispatchToProps = dispatch => ({
  updateLocalAccount: bindActionCreators(updateLocalAccount, dispatch),
});

const mapStateToProps = state => state;

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(NewUserPage);
