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
import { bindActionCreators } from 'redux';
import { setUsername } from '../actions/chatActions';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render(){
    return (
      <div>
        <div className="container">
          <h5 className="center-align">Login</h5>
          <div className="left-align">
           <label className="username_label">
             Username:
             <input type="text"
                    value={this.props.username}
                    onChange={(ev) => this.props.setUsername(ev.target.value)}
             />
            </label>

            <div className="center-align">
              <Link className="waves-effect waves-light btn" to="/synapse/contacts">
                Continue
              </Link>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUsername
  }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    username: state.chat.username
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
