import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import tasksReducer from '../reducers/index';

const store = createStore(tasksReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
