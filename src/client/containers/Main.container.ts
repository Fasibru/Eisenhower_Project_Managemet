import { connect } from 'react-redux';
import Main from '../components/js/Main';

import { Filter, Store, TaskType } from '../../types/storeTypes';

const formatDate = (date: string) => date.substr(0, 10);

const filterTasksByDate = (tasks: TaskType[], filters: Filter) => {
  const today = new Date().toISOString().substring(0, 10);
  const dynamicDateRangeEnd = filters.dateRangeEndDefaultToday ? today : filters.dateRangeEnd;
  return tasks.filter(
    task => formatDate(task.date) >= formatDate(filters.dateRangeStart)
    && formatDate(task.date) <= formatDate(dynamicDateRangeEnd),
  );
};

const filterTasksByStatus = (tasks: TaskType[], filters: Filter) => {
  switch (filters.showTasks) {
    case 'all':
      return tasks;
    case 'completed':
      return tasks.filter(task => task.completed);
    case 'open':
      return tasks.filter(task => !task.completed);
    default:
      throw new Error(`Unknown status filter: ${filters.showTasks}`);
  }
};

const filterTasksBySearchQuery = (tasks: TaskType[], filters: Filter) => {
  const searchQuery = filters.searchQuery.toLocaleLowerCase();
  const tasksAfterSearch = tasks.filter((task) => {
    if (
      task.title.toLocaleLowerCase().indexOf(searchQuery) &&
      task.description.toLocaleLowerCase().indexOf(searchQuery) === -1) {
      return false;
    }
    return task;
  });
  return tasksAfterSearch;
};

const mapStateToProps = (state: Store) => ({
  filteredTasks: filterTasksByStatus(
    filterTasksByDate(
      filterTasksBySearchQuery(state.tasks.tasks, state.filters.filters),
      state.filters.filters),
    state.filters.filters),
});

export default connect(mapStateToProps)(Main);
