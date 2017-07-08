/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

'use babel';

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const NavigationBar = ({ backlink, title, isHidden }) => (
  <nav hidden={isHidden}>
    { backlink ?
          <Link to={backlink} className="navbar-backlink left">
            <i className="material-icons">reply</i>
          </Link>
      : null
    }
    <div href="#" className="brand-logo navbar-title center">
      {title}
    </div>
  </nav>
)

const mapStateToProps = (state, ownProps) => {
  const { backlink, title } = state.navbar;
  const { pathname } = ownProps.location;
  return {
    isHidden: !(!!title && (pathname !== '/synapse/contacts')),
    backlink,
    title
  }
};

export default withRouter(connect(mapStateToProps, null)(NavigationBar));
