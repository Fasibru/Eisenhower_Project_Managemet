import { combineReducers } from 'redux';
import filters from './filters.reducer';
import tasks from './tasks.reducer';
import user from './user.reducer';

export default combineReducers({
  tasks,
  filters,
  user,
});
