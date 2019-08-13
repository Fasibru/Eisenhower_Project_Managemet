import { connect } from 'react-redux';

import { updateFilters } from '../actions/actionsFilters';
import DateFilter from '../components/js/DateFilter';

import { Store, TaskType } from '../../types/storeTypes';

// eslint-disable-next-line max-len
const getMinDate = (tasks: TaskType[]) => {
  if (tasks.length === 0) {
    return new Date().toISOString();
  }
  return tasks.reduce(
    (minDate, task) => (task.date < minDate ? task.date : minDate), tasks[0].date,
  );
};

const formatDate = (date: string) => date.substr(0, 10);

const mapStateToProps = (state: Store) => ({
  dateRangeEnd: formatDate(
    state.filters.filters.dateRangeEndDefaultToday
      ? new Date().toISOString()
      : state.filters.filters.dateRangeEnd,
  ),
  dateRangeEndDefaultToday: state.filters.filters.dateRangeEndDefaultToday,
  dateRangeStart: formatDate(state.filters.filters.dateRangeStart),
  // dateRangeEnd: formatDate(state.filters.filters.dateRangeEnd),
  filters: state.filters.filters,
  minDate: getMinDate(state.tasks.tasks).substr(0, 10),
  userId: state.user.userId,
});

export default connect(mapStateToProps, { updateFilters })(DateFilter);
