import React from 'react';
import PropTypes from 'prop-types';
import PersistentDrawer from '../components/PersistentDrawer';
import Loader from '../components/Loader';

const DrawerLayout = props => (
  <PersistentDrawer title="tangleID" >
    <Loader isLoading={props.isLoading} />
    {props.children}
  </PersistentDrawer>
);


DrawerLayout.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

export default DrawerLayout;
