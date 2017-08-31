import React from 'react';
import Loader from './Loader';

const LoadingScreen = () => (
  <div className='loading-screen'>
    <Loader />
    <div className='loading-text'>LOADING</div>
  </div>
)

export default LoadingScreen;
