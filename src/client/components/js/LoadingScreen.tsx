import * as React from 'react';

import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../scss/LoadingScreen.scss';

const LoadingScreen = () => {
  return (
    <div className="loading-screen__container">
      <div className="loading-screen__text">JATLA</div>
      <div className="loading-screen__spinner">
        <FontAwesomeIcon icon={faCircleNotch} spin={true} />
      </div>
    </div>
  )
};

export default LoadingScreen;
