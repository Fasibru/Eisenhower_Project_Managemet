import axios from 'axios';
// import PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';

import { FiltersActionsTypes } from '../../../types/filterActionTypes';
import { Filter, Store } from '../../../types/storeTypes';
import { updateFilters } from '../../actions/actionsFilters';

interface StatusFilterProps {
  filters: Filter;
  userId: string;
  updateFilters(eventName: string, eventValue: string): FiltersActionsTypes;
}

const mapStateToProps = (state: Store) => ({
  filters: state.filters.filters,
  userId: state.user.userId,
});

// tslint:disable-next-line: variable-name
const StatusFilter: React.FC<StatusFilterProps> = ({
  filters,
  // tslint:disable-next-line: no-shadowed-variable
  updateFilters,
  userId,
}) => {
  const handleFilter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const eventName = (event.target as HTMLButtonElement).name;
    const eventValue = (event.target as HTMLButtonElement).value;
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
  const classNameButtonBorderActive =
    'sidenav__btn sidenav__btn--border-left-right sidenav__btn--active';
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
          className={
            filters.showTasks === 'open'
            ? classNameButtonBorderActive
            : classNameButtonBorderInactive}
          type="button"
          name="showTasks"
          value="open"
          onClick={handleFilter}
          onMouseDown={e => e.preventDefault()} /* to remove focus after button is clicked */
        >Open
        </button>
        <button
          className={
            filters.showTasks === 'completed'
            ? classNameButtonActive
            : classNameButtonInactive}
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
};

// StatusFilter.propTypes = {
//   // filters: PropTypes.shape({
//   //   showTasks: PropTypes.string.isRequired,
//   //   dateRangeStart: PropTypes.string.isRequired,
//   //   dateRangeEnd: PropTypes.string.isRequired,
//   //   dateRangeEndDefaultToday: PropTypes.bool.isRequired,
//   // }).isRequired,
//   updateFilters: PropTypes.func.isRequired,
//   userId: PropTypes.string.isRequired,
// };

export default connect(mapStateToProps, {
  updateFilters,
})(StatusFilter);
