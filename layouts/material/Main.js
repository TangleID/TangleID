import React from 'react';
import PropTypes from 'prop-types';
import PersistentDrawer from '../../components/material/PersistentDrawer';
import Loader from '../../components/Loader';

const MainLayout = props => (
  <PersistentDrawer title="tangleID" >
    <Loader isLoading={props.isLoading} />
    {props.children}
  </PersistentDrawer>
);


MainLayout.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

export default MainLayout;
