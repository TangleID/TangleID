import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';

import configureStore from '../../store/configureStore';
import fetchKeyPairs from '../../actions/fetchKeyPairs';
import updateLocalAccount from '../../actions/updateLocalAccount';
import Layout from '../../layouts/material/Main';
import NewUserForm from '../../components/NewUserForm';
import tangleid from '../../utils/tangleidSetup';

const generateUUID = () => {
  const validChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
  let ret = '';
  for (let i = 0; i < 26; i += 1) { ret = ret.concat(validChar[Math.floor(Math.random() * 27)]); }
  return ret;
};

const NewUserPage = (props) => {
  const { sk, pk } = props.keyPairs;
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
          keyPairs={props.keyPairs}
          uuid={uuid}
          handleSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
};

NewUserPage.propTypes = {
  keyPairs: PropTypes.object,
  updateLocalAccount: PropTypes.func,
};

NewUserPage.getInitialProps = async (context) => {
  const { store, isServer } = context;
  await store.dispatch(fetchKeyPairs());
  return { isServer };
};

const mapDispatchToProps = dispatch => ({
  updateLocalAccount: bindActionCreators(updateLocalAccount, dispatch),
});

const mapStateToProps = (state) => {
  const { keyPairs, isLoading } = state.users;
  return {
    isLoading,
    keyPairs,
  };
};


export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(NewUserPage);
