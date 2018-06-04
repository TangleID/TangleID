import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

function ClaimList(props) {
  return (
    <div>
      {props.claims.map(claim => (
        <div key={`claim-${claim}`}>
          <Link href={`/claims/info/?hash_txn=${JSON.stringify(claim)}`} as={`/claims/info/${claim}`}>
            <a>{claim}</a>
          </Link>
        </div>
      ))}
    </div>
  );
}

ClaimList.propTypes = {
  claims: PropTypes.array,
};

export default ClaimList;
