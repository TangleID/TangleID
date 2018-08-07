import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Send from '@material-ui/icons/Send';

import configureStore from '../store/configureStore';
import createMamMessage from '../actions/createMamMessage';
import DrawerLayout from '../layouts/DrawerLayout';

import UserProfile from '../components/UserProfile';
import ClaimList from '../components/ClaimList';
import MessageList from '../components/MessageList';

import formDataUtils from '../utils/formDataUtils';
import tangleid from '../utils/tangleidSetup';

class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      claims: [],
      mamMessages: [],
    };

    this.reloadClaims = this.reloadClaims.bind(this);
    this.reloadMamMessages = this.reloadMamMessages.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMamSubmit = this.handleMamSubmit.bind(this);
    this.handleSetUser = this.handleSetUser.bind(this);
  }
  componentDidMount() {
    tangleid.api.fetchUserInfo(this.props.id)
      .then((user) => {
        this.setState({ user });
      });

    this.reloadClaims();
    this.reloadMamMessages();
  }

  reloadClaims() {
    tangleid.api.fetchClaims(this.props.id)
      .then((claims) => {
        this.setState({ claims });
      });
  }

  reloadMamMessages() {
    tangleid.api.fetchMamMessages(this.props.id)
      .then((messages) => {
        this.setState({ mamMessages: messages });
      }).catch((error) => {
        console.log(error);
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const values = formDataUtils.convertToObject(formData);
    event.target.reset();

    tangleid.api.createClaim(this.props.id, values)
      .then((claimHash) => {
        console.log(claimHash);
        this.reloadClaims();
      });
  }

  handleMamSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const values = formDataUtils.convertToObject(formData);
    event.target.reset();

    const params = {
      sender: localStorage.getItem('act_as_id'),
      receiver: this.props.id,
      msg: values.msg,
    };
    this.props.createMamMessage(params);
  }

  handleSetUser = () => {
    localStorage.setItem('act_as_id', this.props.id);
  }

  render() {
    return (
      <DrawerLayout>
        {
          this.state.user
            ? <UserProfile user={this.state.user} />
            : null
        }

        <div>
          <h3>Claims about this user</h3>
          {
            this.state.claims && this.state.claims.length > 0
              ? <ClaimList claims={this.state.claims} />
              : <p>No Claims</p>
          }
        </div>

        <div>
          <h3>Mam Messages</h3>
          {
            this.state.mamMessages &&
            !Object.keys(this.state.mamMessages).every(k => this.state.mamMessages[k].length === 0)
              ? <MessageList messages={this.state.mamMessages} />
              : <p>No Messages</p>
          }
        </div>

        <form onSubmit={this.handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              name="msg"
              label="message"
              placeholder="message"
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

        <form onSubmit={this.handleMamSubmit}>
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
          <Button onClick={this.handleSetUser} type="submit" variant="raised" color="primary" size="small">
            SetUser
          </Button>
        </div>

      </DrawerLayout>
    );
  }
}

UserPage.propTypes = {
  id: PropTypes.string,
  createMamMessage: PropTypes.func,
};

UserPage.getInitialProps = async (context) => {
  const { id } = context.query;
  return { id };
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  createMamMessage: bindActionCreators(createMamMessage, dispatch),
});

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(UserPage);
