import React from 'react';
import { connect } from 'react-redux';

import UserItem from './UserItem';

function userListCount(userList) {
  return Object.keys(userList).length
}

const UserList = ({ onlineUsers, offlineUsers }) => (
  <div>
    <ul className="collection with-header user-list" hidden={onlineUsers.length === 0}>
      { onlineUsers.map(user =>
        <UserItem
          key={`online-${user._id}`}
          id={user._id}
          username={user.username}
          isOnline={true}
        />
      )}
      { offlineUsers.map(user =>
        <UserItem
          key={`offline-${user._id}`}
          id={user._id}
          username={user.username }
          isOnline={false}
        />
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
