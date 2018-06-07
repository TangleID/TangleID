import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Send from '@material-ui/icons/Send';

import configureStore from '../store/configureStore';
import checkTangleUsers from '../actions/checkTangleUsers';
import fetchUserList from '../actions/fetchUserList';
import fetchClaims from '../actions/fetchClaims';
import fetchMamMessages from '../actions/fetchMamMessages';
import createClaim from '../actions/createClaim';
import createMamMessage from '../actions/createMamMessage';
import transformToQRCode from '../utils/transformToQRCode';
import Layout from '../layouts/material/Main';
import SimpleForm from '../components/SimpleForm';
import ClaimList from '../components/ClaimList';

import formDataUtils from '../utils/formDataUtils';

const UserPage = (props) => {
  const { claims, messages, user } = props;
  const {
    pk, sk, id, claim, qrcode,
  } = user;

  const handleSubmit = (values) => {
    const params = Object.assign({
      uuid: id,
      partA: '',
      partB: '',
      expDate: '',
      claimPic: '',
    }, values);
    props.createClaim(params);
  };
  const handleMamSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const values = formDataUtils.convertToObject(formData);
    event.target.reset();

    const params = {
      sender: localStorage.getItem('act_as_id'),
      receiver: id,
      msg: values.msg,
    };
    props.createMamMessage(params);
  };
  const handleSetUser = () => {
    localStorage.setItem('act_as_id', id);
  };
  return (
    <Layout>
      <h2>{claim.firstName}</h2>
      <img src={qrcode} alt="QRCode of id and public key" />
      <div>
        <p>id: {id}</p>
        <p>public key: {pk}</p>
      </div>
      <div>
        <p>private key: {sk}</p>
      </div>
      <div>
        <h3>Claims about this user</h3>
        {claims.length === 0 && (
        <p>No Claims</p>
        )}
        {claims.length !== 0 && (
        <ClaimList claims={claims} />
        )}
      </div>
      <div>
        <h3>Mam Messages</h3>
        {Object.keys(messages).length === 0 && (
        <p>No Messages</p>
        )}
        {messages.length !== 0 && (
          Object.keys(messages).map(key => (
            <div key={`div-test-${key}`}>
              <ul>
                <li> {key} </li>
                <ul>
                  {messages[key].map(data => (
                    <li key={`li3-${key}${data.msg}`}>{data.msg} {data.fromSelf ? '- You' : ''}</li>
                  ))}
                </ul>
              </ul>
            </div>
        )))}
      </div>
      <SimpleForm
        name="signClaim"
        handleSubmit={handleSubmit}
        meta={{
          inputs: [{
            name: 'msg',
            label: 'message',
          }],
          submit: {
            text: 'Sign & Attach',
          },
        }}
      />

      <form onSubmit={handleMamSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            name="msg"
            label="sendMamMessage"
            placeholder="sendMamMessage"
            margin="normal"
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit" variant="raised" color="primary" size="small" style={{ margin: '8px' }} >
            Send
            <Send style={{ marginLeft: '8px' }} />
          </Button>
        </div>
      </form>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleSetUser} type="submit" variant="raised" color="primary" size="small">
          SetUser
        </Button>
      </div>
    </Layout>
  );
};

UserPage.propTypes = {
  claims: PropTypes.array,
  messages: PropTypes.object,
  user: PropTypes.object,
  createClaim: PropTypes.func,
  createMamMessage: PropTypes.func,
};

UserPage.getInitialProps = async (context) => {
  const { store } = context;
  const { id } = context.query;
  //  await store.dispatch(fetchOffTangleUserList())
  await store.dispatch(fetchUserList());
  /* what is this used for ? */
  await store.dispatch(checkTangleUsers([{ id }]));
  await store.dispatch(fetchClaims(id));
  await store.dispatch(fetchMamMessages(id));
  const { users } = store.getState();
  const {
    localList, claims, messages,
  } = users;
  /* not working at all */
  // const validIds = validData.map(v => v.id);
  // TODO: Use selector to get better performance
  //  const userList = offTangleData.filter(d => validIds.indexOf(d.id) !== -1)
  const userList = localList;// .filter(d => validIds.indexOf(d.id) !== -1)
  const user = userList.find(u => u.id === id);
  const otherUser = userList.map(u => u.id).filter(i => i !== id);
  const { pk } = user;
  user.qrcode = await transformToQRCode(JSON.stringify({ pk, id }));
  return {
    id,
    user,
    claims,
    messages,
    otherUser,
  };
};

const mapDispatchToProps = dispatch => ({
  createClaim: bindActionCreators(createClaim, dispatch),
  createMamMessage: bindActionCreators(createMamMessage, dispatch),
});

const mapStateToProps = (state, ownProps) => {
  const {
    user, claims, messages, otherUser,
  } = ownProps;
  return {
    user, claims, messages, otherUser,
  };
};

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(UserPage);
