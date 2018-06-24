import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Badge from '@material-ui/core/Badge';
import { blue as BlueColor } from '@material-ui/core/colors';

const styless = {
  root: {
    flexGrow: 1,
  },
  'list-expand': {
    border: '1px solid #0288D1',
  },
  Word_Coler: {
    color: '#2196F3',
  },
  'userFullName-before': {
    'font-size': '0.875rem',
    color: '#2196F3',
  },
  'userFullName-after': {
    'font-size': '1.2em',
    color: '#212121',
  },
};

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
