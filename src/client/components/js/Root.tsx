import * as React from 'react';
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

// tslint:disable-next-line: variable-name
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

export default Root;
