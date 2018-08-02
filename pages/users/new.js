import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';

import configureStore from '../../store/configureStore';
import updateLocalAccount from '../../actions/updateLocalAccount';
import Layout from '../../layouts/material/Main';
import NewUserForm from '../../components/NewUserForm';
import createKeyPair from '../../utils/createKeyPair';
import tangleid from '../../utils/tangleidSetup';

const generateUUID = () => {
  const validChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
  let ret = '';
  for (let i = 0; i < 26; i += 1) { ret = ret.concat(validChar[Math.floor(Math.random() * 27)]); }
  return ret;
};

const NewUserPage = (props) => {
  const keyPairs = createKeyPair();
  const { sk, pk } = keyPairs;
  const uuid = generateUUID();
  const handleSubmit = (values) => {
    const params = Object.assign({ pk }, values);
    tangleid.api.createIdentity(uuid, params)
      .then((txHash) => {
        console.log('Identity created:', txHash);
        const account = {
          claim: values, id: uuid, sk, pk,
        };
        props.updateLocalAccount(account);
      });
  };
  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <NewUserForm
          keyPairs={keyPairs}
          uuid={uuid}
          handleSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
};

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
