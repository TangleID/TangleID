import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import configureStore from '../../store/configureStore';
import Layout from '../../layouts/Main';
import showClaims from '../../actions/showClaims';

class ShowClaimPage extends Component {
  render() {
    const infoArray = this.props.claims[0].text.split(',');
    return (
      <Layout>
        <h2>Claim full content:</h2>
        <a>Part A: {infoArray[0]}</a><br />
        <a>Part B: {infoArray[1]}</a><br />
        <a>Expiration Date: {infoArray[2]}</a><br />
        <a>Image: </a><br />
        <img src={infoArray[3]} alt="" /><br />
        <a>Description: {infoArray[4]}</a>
      </Layout>
    );
  }
}

ShowClaimPage.propTypes = {
  claims: PropTypes.array,
};

ShowClaimPage.getInitialProps = async (context) => {
  const { store } = context;
  const { transactionHash } = context.query;

  await store.dispatch(showClaims(transactionHash));

  return {
    transactionHash,
  };
};

const mapDispatchToProps = dispatch => ({
  showClaim: bindActionCreators(showClaims, dispatch),
});

const mapStateToProps = (state) => {
  const { user, claims } = state.users;

  return { user, claims };
};

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(ShowClaimPage);
