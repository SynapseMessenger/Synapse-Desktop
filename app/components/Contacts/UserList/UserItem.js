import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { loadSession } from '../../../actions/chatActions';

const UserItem = ({ id, username, loadSession, isOnline }) => (
  <div
    className={
      classNames("collection-item", "user-item", {
      'online-user': isOnline,
      'offline-user': !isOnline
      })
    }
    key={id}
    onClick={(ev) => { if (isOnline) { loadSession(id) } }}
  >
    <div className='user-item-username'>
      {username}
    </div>
    <span href="#!" className="user-item-send-icon">
      <i className="material-icons">send</i>
    </span>
  </div>
)

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadSession
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(UserItem);
