'use babel';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {
  render() {
    const { backlink, title } = this.props;
    const hasTitle = !!title;
    return (
      <nav hidden={!hasTitle}>
        <div href="#" className="brand-logo navbar-title center">
          {title}
        </div>
        { backlink ?
              <Link to={backlink} className="navbar-backlink left">
                <i className="material-icons">reply</i>
              </Link>
          : null
        }
      </nav>
    );
  }
}


const mapStateToProps = (state) => {
  return state.navbar;
};

export default connect(mapStateToProps, null)(NavigationBar);
