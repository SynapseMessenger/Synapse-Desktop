import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({ id, username }) => (
  <Link
    to={`/synapse/chat/${id}`}
    className="collection-item user-item"
    key={id}
  >
    <div>
      {username}
      <span href="#!" className="secondary-content">
        <i className="material-icons">send</i>
      </span>
    </div>
  </Link>
)

export default UserItem;
