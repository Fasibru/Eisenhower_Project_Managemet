import React from 'react';

import '../scss/LoadingScreen.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';


const LoadingScreen = () => {
  return (
    <div className="loading-screen__container">
      <div className="loading-screen__text">JATLA</div>
      <div className="loading-screen__spinner">
        <FontAwesomeIcon icon={faCircleNotch} spin />
      </div>
    </div>
  )
};

export default LoadingScreen;
