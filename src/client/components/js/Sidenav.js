import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  updateFilters,
  openNewTaskPopup,
} from '../../actions/index';
import '../css/Sidenav.css';

const mapStateToProps = state => ({
  filters: state.filtersRedux,
});

function Sidenav(props) {
  const {
    // eslint-disable-next-line no-shadow
    openNewTaskPopup,
    filters,
    // eslint-disable-next-line no-shadow
    updateFilters,
  } = props;

  const handleFilterShowTasks = (event) => {
    // eslint-disable-next-line no-shadow
    updateFilters(event.target.name, event.target.value);

    axios.put('/api/filters', Object.assign({}, filters, {
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <aside className="sidenav">
      <ul className="sidenav__list">
        <li className="sidenav__list-elem">Search field</li>
        <li className="sidenav__list-elem">
          <button type="button" onClick={openNewTaskPopup}>New Task</button>
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
  openNewTaskPopup: PropTypes.func.isRequired,
  updateFilters: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    showTasks: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, {
  updateFilters,
  openNewTaskPopup,
})(Sidenav);
