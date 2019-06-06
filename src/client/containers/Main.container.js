import { connect } from 'react-redux';
import Main from '../components/js/Main';

const filterTasks = (tasks, filters) => {
  switch (filters.showTasks) {
    case 'both':
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
  filteredTasksRedux: filterTasks(state.tasks, state.filtersRedux),
});

export default connect(mapStateToProps)(Main);