import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// export default store;
