'use babel';

import React from 'react';
import { connect } from 'react-redux';

class ChatLobby extends React.Component {
  render() {
    return (
      <div className="container">
        ChatLobby
        Hello, {this.props.username}!
      </div>
    );
  }
}

//
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     setUsername
//   }, dispatch);
// };

const mapStateToProps = (state) => {
  return {
    username: state.synapse.username
  };
};

export default connect(mapStateToProps, null)(ChatLobby);