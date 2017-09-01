import React from 'react';
import { connect } from 'react-redux';

import UserItem from './UserItem';
import SearchUsers from './SearchUsers';

function userListCount(userList) {
  return Object.keys(userList).length
}

const UserList = ({ onlineUsers, offlineUsers, searchInput }) => (
  <div>
    <ul className="collection with-header user-list">
      <SearchUsers />
      { onlineUsers.filter(
          ({username}) => username.includes(searchInput)
        ).map(user =>
          <UserItem
            key={`online-${user._id}`}
            id={user._id}
            username={user.username}
            isOnline={true}
          />
        )
      }
      { offlineUsers.filter(
          ({username}) => username.includes(searchInput)
        ).map(user =>
          <UserItem
            key={`offline-${user._id}`}
            id={user._id}
            username={user.username }
            isOnline={false}
          />
        )
      }
    </ul>
  </div>
)

const mapStateToProps = (state) => {
  const { onlineUsers, offlineUsers } = state.chat;
  return {
    onlineUsers: Object.values(onlineUsers),
    offlineUsers: Object.values(offlineUsers),
    searchInput: state.chat.userSearchInput,
  };
};

export default connect(mapStateToProps, null)(UserList);
