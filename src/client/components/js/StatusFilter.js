import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  updateFilters,
  openNewTaskPopup,
} from '../../actions/index';

const mapStateToProps = state => ({
  filters: state.filters.filters,
});

function StatusFilter({
  filters,
  // eslint-disable-next-line no-shadow
  updateFilters,
}) {
  const handleFilter = (event) => {
    // eslint-disable-next-line no-shadow
    updateFilters(event.target.name, event.target.value);

    axios.put('/api/filters', {
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const classNameButtonActive = 'sidenav__btn sidenav__btn--active';
  const classNameButtonInactive = 'sidenav__btn';
  const classNameButtonBorderActive = 'sidenav__btn sidenav__btn--border-left-right sidenav__btn--active';
  const classNameButtonBorderInactive = 'sidenav__btn sidenav__btn--border-left-right';

  return (
    <div className="sidenav__list-elem--flex">
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
};

export default connect(mapStateToProps, {
  updateFilters,
  openNewTaskPopup,
})(StatusFilter);
