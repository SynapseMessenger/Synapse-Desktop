'use babel';

import React from 'react';
import { connect } from 'react-redux';

class Conversation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.match.params.userId;
  const users = state.synapse.onlineUsers;
  return {
    user: users.find((user) => user._id === userId)
  };
};

export default connect(mapStateToProps, null)(Conversation);