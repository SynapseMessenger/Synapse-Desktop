import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeSearchInput } from '../../../actions/chatActions';

const SearchUsers = ({userSearchInput, changeSearchInput}) => (
  <div className="collection-item user-item search-user-wrapper">
    <input
      value={userSearchInput}
      onChange={(ev) => changeSearchInput(ev.target.value)}
      className="input-search-user"
      type='text'
      placeholder="Search"
      maxLength="20"
    />
  </div>
)

const mapStateToProps = (state) => {
  return {
    userSearchInput: state.chat.userSearchInput
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeSearchInput
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers);
