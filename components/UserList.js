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
  'userFullName-before': {
    'font-size': '0.875rem',
    color: '#2196F3',
  },
  'userFullName-after': {
    'font-size': '1.2em',
    color: '#212121',
  },
};
const bgColor = {
  start: Object.keys(BlueColor).indexOf('200'),
  end: Object.keys(BlueColor).indexOf('0'),
};
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.listExpand = this.listExpand.bind(this);
  }
  static getFullName(claim) {
    return `${claim.firstName} ${claim.lastName}`;
  }
listExpand = panelIndex => (event, expanded) => {
  const parent = event.currentTarget.parentElement;
  let { start } = bgColor;
  const { end } = bgColor;
  let operator = 0;

  if (start - end < 0) {
    operator = end - start;
    start = end;
  } else {
    operator = start - end;
  }

  operator += 1;
  const colorIndex = Object.keys(BlueColor)[start - (panelIndex % operator)];

  parent.style['background-color'] = BlueColor[colorIndex];

  if (expanded) {
    parent.style.border = styless['list-expand'].border;
    parent.querySelector('p.userFullName').style.fontSize = styless['userFullName-after']['font-size'];
    parent.querySelector('p.userFullName').style.color = styless['userFullName-after'].color;
  } else {
    parent.setAttribute('style', '');
    parent.querySelector('p.userFullName').style.fontSize = styless['userFullName-before']['font-size'];
    parent.querySelector('p.userFullName').style.color = styless['userFullName-before'].color;
  }
}
render() {
  const { users } = this.props;
  return (
    <div style={styless.root}>
      {
        users.map((user, i) => (
          <ExpansionPanel onChange={this.listExpand(i)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="userFullName">{this.constructor.getFullName(user.claim)}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div style={styless.chatroom}>
                  <Link href={`/user?id=${user.id}`} as={`/users/${user.id}`}>
                    <IconButton tooltip="Profile">
                      <Badge
                        secondary
                        badgeStyle={{ top: 12, right: 12 }}
                      >
                        <AccountBoxIcon />
                      </Badge>
                    </IconButton>
                  </Link>
                </div>

              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
  ))
  }
    </div>
  );
}
}


UserList.propTypes = {
  users: PropTypes.array,
};

export default UserList;
