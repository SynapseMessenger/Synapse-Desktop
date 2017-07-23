import React from 'react';
import { connect } from 'react-redux';

import UserItem from './UserItem';

function userListCount(userList) {
  return Object.keys(userList).length
}

const UserList = ({ onlineUsers, offlineUsers }) => (
  <div>
    <h4 className="center-align contacts-title">Contacts</h4>
    <h6 className="left-align">Online: ({onlineUsers.length})</h6>
    <ul className="collection with-header user-list" hidden={onlineUsers.length === 0}>
      { onlineUsers.map(user =>
        <UserItem key={`online-${user._id}`} id={user._id} username={user.username } />
      )}
    </ul>

    <h6 className="left-align">Offline: ({offlineUsers.length})</h6>
    <ul className="collection with-header user-list" hidden={offlineUsers.length === 0}>
      { offlineUsers.map(user =>
        <UserItem key={`offline-${user._id}`} id={user._id} username={user.username } />
      )}
    </ul>
  </div>
)

const mapStateToProps = (state) => {
  const { onlineUsers, offlineUsers } = state.chat;
  return {
    onlineUsers: Object.values(onlineUsers),
    offlineUsers: Object.values(offlineUsers),
  };
};

export default connect(mapStateToProps, null)(UserList);
