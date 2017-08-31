import React from 'react';

const Loader = props => (
  <div className="preloader-wrapper loading-page-loader active">
    <div className="spinner-layer">
      <div className="circle-clipper left">
        <div className="circle"></div>
      </div><div className="gap-patch">
        <div className="circle"></div>
      </div><div className="circle-clipper right">
        <div className="circle"></div>
      </div>
    </div>
  </div>
);

export default Loader;
