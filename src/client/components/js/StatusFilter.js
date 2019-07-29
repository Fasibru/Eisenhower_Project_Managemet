import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';

import { updateFilters } from '../../actions/actionsFilters';

const mapStateToProps = state => ({
  filters: state.filters.filters,
  userId: state.user.userId,
});

function StatusFilter({
  filters,
  // eslint-disable-next-line no-shadow
  updateFilters,
  userId,
}) {
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

  const classNameButtonActive = 'sidenav__btn sidenav__btn--active';
  const classNameButtonInactive = 'sidenav__btn';
  const classNameButtonBorderActive = 'sidenav__btn sidenav__btn--border-left-right sidenav__btn--active';
  const classNameButtonBorderInactive = 'sidenav__btn sidenav__btn--border-left-right';

  return (
    <div className="sidenav__status">
      <p>Show tasks:</p>
      <div className="sidenav__showTasks">
        <button
          className={filters.showTasks === 'all' ? classNameButtonActive : classNameButtonInactive}
          type="button"
          name="showTasks"
          value="all"
          onClick={handleFilter}
          onMouseDown={e => e.preventDefault()} /* to remove focus after button is clicked */
        >All
        </button>
        <button
          className={filters.showTasks === 'open' ? classNameButtonBorderActive : classNameButtonBorderInactive}
          type="button"
          name="showTasks"
          value="open"
          onClick={handleFilter}
          onMouseDown={e => e.preventDefault()} /* to remove focus after button is clicked */
        >Open
        </button>
        <button
          className={filters.showTasks === 'completed' ? classNameButtonActive : classNameButtonInactive}
          type="button"
          name="showTasks"
          value="completed"
          onClick={handleFilter}
          onMouseDown={e => e.preventDefault()} /* to remove focus after button is clicked */
        >Completed
        </button>
      </div>
    </div>
  );
}

StatusFilter.propTypes = {
  updateFilters: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    showTasks: PropTypes.string,
    dateRangeStart: PropTypes.string,
    dateRangeEnd: PropTypes.string,
  }).isRequired,
  userId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {
  updateFilters,
})(StatusFilter);
