import * as React from 'react';
// import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import App from './App';
import Home from './Home';

import { store } from '../../store/index';

// import { Store } from '../../../types/storeTypes';

// interface RootProps {
//   store: Store;
// }

const Root: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/app" component={App} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </Provider>
);

// Root.propTypes = {
//   // eslint-disable-next-line react/forbid-prop-types
//   store: PropTypes.object.isRequired,
// };

export default Root;
