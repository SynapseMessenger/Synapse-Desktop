'use babel';

import React from 'react';

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo right">Logo</a>
        </div>
      </nav>
    );
  }
}
