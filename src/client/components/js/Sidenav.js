/*
This component serves as the section for setting filters to slice and dice the data/tasks
*/

import React from 'react';
import PropTypes from 'prop-types';
import '../css/Sidenav.css';

function Sidenav(props) {
  const {
    toggleNewTaskPopup,
    handleFilterShowTasks,
    filters,
  } = props;
  return (
    <aside className="sidenav">
      <ul className="sidenav__list">
        <li className="sidenav__list-elem">Search field</li>
        <li className="sidenav__list-elem">
          <button type="button" onClick={toggleNewTaskPopup}>New Task</button>
        </li>
        <li className="sidenav__list-elem">
          <p>Show tasks:</p>
          <form>
            <select name="showTasks" value={filters.showTasks} onChange={handleFilterShowTasks}>
              <option value="both">Both</option>
              <option value="open">Open</option>
              <option value="completed">Completed</option>
            </select>
          </form>
        </li>
        <li className="sidenav__list-elem">Specify Filters (filter section below)</li>
      </ul>
    </aside>
  );
}

Sidenav.propTypes = {
  toggleNewTaskPopup: PropTypes.func.isRequired,
  handleFilterShowTasks: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    showTasks: PropTypes.string,
  }).isRequired,
};

export default Sidenav;
