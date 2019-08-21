// import PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { openNewTaskPopup } from '../../actions/actionsTasks';
import '../scss/Sidenav.scss';

import DateFilterContainer from '../../containers/DateFilter.container';
import SearchFilter from './SearchFilter';
import StatusFilter from './StatusFilter';

import { TaskActionsTypes } from '../../../types/taskActionTypes';

interface SidenavProps {
  isOpen: boolean;
  toggleFilterMenu(): void;
  openNewTaskPopup(): TaskActionsTypes;
}

// tslint:disable-next-line: variable-name
export const Sidenav: React.FC<SidenavProps> = ({
  // tslint:disable-next-line: no-shadowed-variable
  openNewTaskPopup,
  isOpen,
  toggleFilterMenu,
}) => {
  return (
    <aside
      className={isOpen ? 'sidenav sidenav--active' : 'sidenav'}
    >
      <button
        type="button"
        className="sidenav__close-icon"
        onClick={toggleFilterMenu}
        onMouseDown={e => e.preventDefault()} /* to remove focus after button is clicked */
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <ul className="sidenav__list">
        <li className="sidenav__list-elem">
          <button
            className="sidenav__btn"
            type="button"
            onClick={openNewTaskPopup}
          >
            Add New Task
          </button>
        </li>
        <li className="sidenav__list-elem">
          <SearchFilter />
        </li>
        <li className="sidenav__list-elem">
          <StatusFilter />
        </li>
        <li className="sidenav__list-elem">
          <DateFilterContainer />
        </li>
        <li
          className="sidenav__list-elem"
        >
          Specify further filters e.g. by team member (very much in the future)
        </li>
      </ul>
    </aside>
  );
};

// Sidenav.propTypes = {
//   openNewTaskPopup: PropTypes.func.isRequired,
//   toggleFilterMenu: PropTypes.func.isRequired,
//   isOpen: PropTypes.bool.isRequired,
// };

export default connect(null, {
  openNewTaskPopup,
})(Sidenav);
