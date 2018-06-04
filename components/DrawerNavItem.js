import React from 'react';
import Link from 'next/link';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const DrawerNavItem = () => (
  <nav>
    <ListItem button>
      <Link prefetch href="/users/">
        <ListItemText primary="Users" />
      </Link>
    </ListItem>
    <ListItem button>
      <Link prefetch href="/users/new/">
        <ListItemText primary="New User" />
      </Link>
    </ListItem>

  </nav>
);

export default DrawerNavItem;
