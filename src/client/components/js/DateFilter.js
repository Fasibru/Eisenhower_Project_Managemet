import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function DateFilter(props) {
  const {
    dateRangeStart,
    dateRangeEnd,
    minDate,
    filters,
    updateFilters,
    userId,
  } = props;

  const handleFilter = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    axios.put(`/api/filters/${userId}`, {
      ...filters,
      userID: userId,
      [eventName]: eventValue,
    })
      // eslint-disable-next-line no-shadow
      .then(() => updateFilters(eventName, eventValue))
      .catch(err => console.log(err));
  };

  return (
    <div className="sidenav__date">
      <p>Created between</p>
      <input
        className="sidenav__input"
        type="Date"
        name="dateRangeStart"
        value={dateRangeStart}
        min={minDate}
        onChange={handleFilter}
      />
      <p>and</p>
      <input
        className="sidenav__input"
        type="Date"
        name="dateRangeEnd"
        value={dateRangeEnd}
        max={new Date().toISOString().substring(0, 10)}
        onChange={handleFilter}
      />
    </div>
  );
}

DateFilter.propTypes = {
  dateRangeStart: PropTypes.string.isRequired,
  dateRangeEnd: PropTypes.string.isRequired,
  minDate: PropTypes.string.isRequired,
  filters: PropTypes.shape({
    showTasks: PropTypes.string,
    dateRangeStart: PropTypes.string,
    dateRangeEnd: PropTypes.string,
  }).isRequired,
  updateFilters: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default DateFilter;
