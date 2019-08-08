import { connect } from 'react-redux';
import Main from '../components/js/Main';

const formatDate = date => date.substr(0, 10);

const filterTasksByDate = (tasks, filters) => {
  const today = new Date().toISOString().substring(0, 10);
  const dynamicDateRangeEnd = filters.dateRangeEndDefaultToday ? today : filters.dateRangeEnd;
  return tasks.filter(
    task => formatDate(task.date) >= formatDate(filters.dateRangeStart)
    && formatDate(task.date) <= formatDate(dynamicDateRangeEnd),
  );
};

const filterTasksByStatus = (tasks, filters) => {
  switch (filters.showTasks) {
    case 'all':
      return tasks;
    case 'completed':
      return tasks.filter(task => task.completed === true);
    case 'open':
      return tasks.filter(task => task.completed === false);
    default:
      throw new Error(`Unknown status filter: ${filters.showTasks}`);
  }
};

const mapStateToProps = state => ({
  filteredTasks: filterTasksByStatus(
    filterTasksByDate(state.tasks.tasks, state.filters.filters), state.filters.filters,
  ),
});

export default connect(mapStateToProps)(Main);
