import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  openNewTaskPopup,
} from '../../actions/index';
import '../scss/Sidenav.scss';

import StatusFilter from './StatusFilter';
import DateFilter from '../../containers/DateFilter.container';

// eslint-disable-next-line no-shadow
export function Sidenav({ openNewTaskPopup }) {
  return (
    <aside className="sidenav">
      <ul className="sidenav__list">
        <li className="sidenav__list-elem sidenav__list-elem--flex">
          <button className="sidenav__btn" type="button" onClick={openNewTaskPopup}>Add New Task</button>
        </li>
        <li className="sidenav__list-elem sidenav__list-elem--flex">
          <p>Search tasks:</p>
          <input className="sidenav__list-elem--flex" type="search" placeholder="...to be implemented..." />
        </li>
        <li className="sidenav__list-elem sidenav__list-elem--flex">
          <StatusFilter />
        </li>
        <li className="sidenav__list-elem sidenav__list-elem--flex">
          <DateFilter />
        </li>
        <li className="sidenav__list-elem sidenav__list-elem--flex">Specify further filters e.g. by team member (very much in the future)</li>
      </ul>
    </aside>
  );
}

Sidenav.propTypes = {
  openNewTaskPopup: PropTypes.func.isRequired,
};

export default connect(null, {
  openNewTaskPopup,
})(Sidenav);
