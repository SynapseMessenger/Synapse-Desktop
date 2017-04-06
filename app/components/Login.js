'use babel';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUsername } from '../actions';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render(){
    console.log("Username: ", this.props);
    return (
      <div>
           <label>
             Name:
             <input type="text" value={this.props.username} onChange={(ev) => this.props.setUsername(ev.target.value)} />
          </label>
          <Link to="/lobby">Continue</Link>
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
  console.log("State is: ", state);
  return {
    username: state.login.username
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);