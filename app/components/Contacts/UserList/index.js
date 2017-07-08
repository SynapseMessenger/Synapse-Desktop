import React from 'react';
import { connect } from 'react-redux';

import UserItem from './UserItem';

function userListCount(userList) {
  return Object.keys(userList).length
}

const UserList = ({ onlineUsers, offlineUsers }) => (

  <div>
    <h4 className="center-align contacts-title">Contacts</h4>
    <h6 className="left-align">Online: ({userListCount(onlineUsers)})</h6>
    <ul className="collection with-header user-list" hidden={userListCount(onlineUsers) === 0}>
      { Object.keys(onlineUsers).map(id =>
        <UserItem key={`online-${id}`} id={id} username={onlineUsers[id].username } />
      )}
    </ul>

    <h6 className="left-align">Offline: ({userListCount(offlineUsers)})</h6>
    <ul className="collection with-header user-list" hidden={userListCount(offlineUsers) === 0}>
      { Object.keys(offlineUsers).map(id =>
        <UserItem key={`offline-${id}`} id={id} username={offlineUsers[id].username } />
      )}
    </ul>
  </div>
)

const mapStateToProps = (state) => {
  const { onlineUsers, offlineUsers } = state.chat;
  return {
    onlineUsers,
    offlineUsers,
  };
};

export default connect(mapStateToProps, null)(UserList);
