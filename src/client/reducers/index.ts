import { combineReducers } from 'redux';

import filters from './filters.reducer';
import tasks from './tasks.reducer';
import user from './user.reducer';

import { Store } from '../../types/storeTypes';

export default combineReducers<Store>({
  filters,
  tasks,
  user,
});
