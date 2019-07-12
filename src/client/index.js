import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';

import store from './store/index';
import Root from './components/js/Root';
// import App from './components/js/App';

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
);
