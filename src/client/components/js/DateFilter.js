import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function DateFilter(props) {
  const {
    dateRangeStart,
    dateRangeEnd,
    minDate,
    filters,
    dateRangeEndDefaultToday,
    updateFilters,
    userId,
  } = props;

  const today = new Date().toISOString().substring(0, 10);

  const handleFilter = (event) => {
    let eventValue;
    const eventName = event.target.name;
    if (eventName === 'dateRangeEndDefaultToday') {
      eventValue = event.target.checked;
      axios.put(`/api/filters/${userId}`, {
        ...filters,
        userID: userId,
        dateRangeEndDefaultToday: eventValue,
        dateRangeEnd: today,
      })
        // eslint-disable-next-line no-shadow
        .then(() => {
          updateFilters('dateRangeEndDefaultToday', eventValue);
          updateFilters('dateRangeEnd', today);
        })
        .catch(err => console.log(err));
    } else {
      eventValue = event.target.value;
      axios.put(`/api/filters/${userId}`, {
        ...filters,
        userID: userId,
        [eventName]: eventValue,
      })
        // eslint-disable-next-line no-shadow
        .then(() => updateFilters(eventName, eventValue))
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="sidenav__date">
      <p>Created between</p>
      <input
        className="sidenav__input sidenav_input-date--no-arrow"
        type="Date"
        name="dateRangeStart"
        value={dateRangeStart}
        min={minDate}
        max={today}
        onChange={handleFilter}
      />
      <p>and</p>
      <input
        className="sidenav__input sidenav_input-date--no-arrow"
        type="Date"
        name="dateRangeEnd"
        value={dateRangeEndDefaultToday ? today : dateRangeEnd}
        min={minDate}
        max={today}
        onChange={handleFilter}
        disabled={dateRangeEndDefaultToday}
      />
      <p className="sidenav__date-default-today">
        <span>Default to today:</span>
        <input
          type="checkbox"
          name="dateRangeEndDefaultToday"
          checked={dateRangeEndDefaultToday}
          onChange={handleFilter}
        />
      </p>
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
  dateRangeEndDefaultToday: PropTypes.bool.isRequired,
};

export default DateFilter;
