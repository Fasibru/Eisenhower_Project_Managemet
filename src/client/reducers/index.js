import { combineReducers } from 'redux';
import filters from './filters.reducer';
import tasks from './tasks.reducer';

export default combineReducers({
  tasks,
  filters,
});
