import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadSession } from '../../../actions/chatActions';

const UserItem = ({ id, username, loadSession }) => (
  <Link
    to={`/synapse/chat/${id}`}
    className="collection-item user-item"
    key={id}
    onClick={(ev) => { loadSession(id) }}
  >
    <div>
      {username}
      <span href="#!" className="secondary-content">
        <i className="material-icons">send</i>
      </span>
    </div>
  </Link>
)

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadSession
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(UserItem);
