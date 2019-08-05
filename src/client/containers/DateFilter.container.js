import { connect } from 'react-redux';

import DateFilter from '../components/js/DateFilter';
import { updateFilters } from '../actions/actionsFilters';

// eslint-disable-next-line max-len
const getMinDate = (tasks) => {
  if (tasks.length === 0) {
    return new Date().toISOString();
  }
  return tasks.reduce(
    (minDate, task) => (task.date < minDate ? task.date : minDate), tasks[0].date,
  );
};

const formatDate = date => date.substr(0, 10);

const mapStateToProps = state => ({
  dateRangeStart: formatDate(state.filters.filters.dateRangeStart),
  // dateRangeEnd: formatDate(state.filters.filters.dateRangeEnd),
  dateRangeEnd: formatDate(
    state.filters.filters.dateRangeEndDefaultToday
      ? new Date().toISOString()
      : state.filters.filters.dateRangeEnd,
  ),
  dateRangeEndDefaultToday: state.filters.filters.dateRangeEndDefaultToday,
  minDate: getMinDate(state.tasks.tasks).substr(0, 10),
  filters: state.filters.filters,
  userId: state.user.userId,
});

export default connect(mapStateToProps, { updateFilters })(DateFilter);
