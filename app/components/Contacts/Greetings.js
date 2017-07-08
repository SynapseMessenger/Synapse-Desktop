import React from 'react';
import { connect } from 'react-redux';

const Greetings = ({ username }) => (
  <div className="greetings-message">
    Hello, {username}!
    Connecting to server...
  </div>
)

const mapStateToProps = state => ({
  username: state.chat.username
})

export default connect(mapStateToProps, null)(Greetings);
