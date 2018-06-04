import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

class ClaimList extends Component {
  render() {
    return (
      <div>
        {this.props.claims.map(claim => (
          <div key={`claim-${claim}`}>
            <Link href={`/claims/info/?hash_txn=${JSON.stringify(claim)}`} as={`/claims/info/${claim}`}>
              <a>{claim}</a>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

ClaimList.propTypes = {
  claims: PropTypes.array,
};

export default ClaimList;
