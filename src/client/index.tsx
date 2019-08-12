import '@babel/polyfill';
import * as React from 'react';
// tslint:disable-next-line: import-name
import ReactDOM from 'react-dom';

import Root from './components/js/Root';

ReactDOM.render(
  <Root />,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);
