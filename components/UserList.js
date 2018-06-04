import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const UserList = (props) => {
  const { users } = props;
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <Link href={`/user?id=${user.id}`} as={`/users/${user.id}`}>
            <a>{user.id}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array,
};

export default UserList;
