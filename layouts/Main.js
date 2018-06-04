import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../components/Nav';

const MainLayout = props => (
  <div>
    <Nav />
    <div>
      {props.children}
    </div>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
