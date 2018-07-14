import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import configureStore from '../../store/configureStore';
import Layout from '../../layouts/material/Main';

import tangleid from '../../utils/tangleidSetup';

class ShowClaimPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      claim: null,
    };
  }

  componentDidMount() {
    tangleid.api.fetchClaimInfo(this.props.transactionHash)
      .then((claim) => {
        this.setState({ claim });
      });
  }


  render() {
    return (
      <Layout>
        {
          this.state.claim
            ?
              <div>
                <h2>Claim full content:</h2>
                <p>UUID: {this.state.claim.uuid}</p>
                <p>Message: {this.state.claim.msg}</p>
                <a>Part A: {this.state.claim.partA}</a><br />
                <a>Part B: {this.state.claim.partB}</a><br />
                <a>Expiration Date: {this.state.claim.expiratedAt}</a><br />
                <a>Image: </a><br />
                <img src={this.state.claim.imageURL} alt="" /><br />
              </div>
            : <p>No claim detail.</p>
        }

      </Layout>
    );
  }
}

ShowClaimPage.propTypes = {
  transactionHash: PropTypes.string.isRequired,
};

ShowClaimPage.getInitialProps = (context) => {
  const { transactionHash } = context.query;
  return {
    transactionHash,
  };
};

export default withRedux(configureStore)(ShowClaimPage);
