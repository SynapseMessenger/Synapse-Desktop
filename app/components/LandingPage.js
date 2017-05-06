/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

'use babel';

import React from 'react';
import { Link } from 'react-router-dom';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="container">
          <h4 className="center-align welcome-message">
            Welcome to Synapse
          </h4>

          <div className="logo"></div>

          <div className="center-align">
            <Link className="btn btn-floating btn-large pulse" to="/login">
              Login
            </Link>
          </div>

        </div>
      </div>
    );
  }
}
