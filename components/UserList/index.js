import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// add MailIcon
import MailIcon from '@material-ui/icons/Mail';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Badge from '@material-ui/core/Badge';
import { blue as BlueColor } from '@material-ui/core/colors';

const styless = {
  root: {
    flexGrow: 1,
  },
  chatroom: {
    display: 'inline',
    margin: '0 10px',
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

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: {
        start: Object.keys(BlueColor).indexOf('200'),
        end: Object.keys(BlueColor).indexOf('0'),
      },
    };
  }
getFullName = claim => `${claim.firstName} ${claim.lastName}`
listExpand = panelIndex => (event, expanded) => {
  const parent = event.currentTarget.parentElement;
  let [start] = this.state.bgColor.start;
  const [end] = this.state.bgColor.end;
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
  return (
    <div style={styless.root}>
      {
        this.props.users.map((user, i) => (
          <ExpansionPanel onChange={this.listExpand(i)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="userFullName" style={styless.Word_Coler}>{this.getFullName(user.claim)}</Typography>
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
