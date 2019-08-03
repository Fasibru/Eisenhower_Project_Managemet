import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserTasks } from '../../actions/actionsTasks';
import { getUserFilters } from '../../actions/actionsFilters';

import { getUser } from '../../actions/actionsUser';

import Header from './Header';
import Sidenav from './Sidenav';
import FilteredMain from '../../containers/Main.container';
import Footer from './Footer';
import NewTask from './NewTask';
import EditTask from './EditTask';

import '../scss/App.scss';

const mapStateToProps = state => ({
  newTaskPopup: state.tasks.newTaskPopup,
  editTaskPopup: state.tasks.editTaskPopup,
  isFetchingTasks: state.tasks.isFetchingTasks,
  userId: state.user.userId,
  userError: state.user.userError,
  isFetchingUser: state.user.isFetchingUser,
  isFetchingFilters: state.filters.isFetchingFilters,
});

export const App = ({
  /* eslint-disable no-shadow */
  getUserTasks,
  getUserFilters,
  getUser,
  newTaskPopup,
  editTaskPopup,
  userId,
  userError,
  isFetchingTasks,
  isFetchingUser,
  isFetchingFilters,
  /* eslint-enable no-shadow */
}) => {
  // guide on fetching data with useEffect:
  // https://www.robinwieruch.de/react-hooks-fetch-data/
  useEffect(() => {
    const fetchData = async () => {
      await getUser();
      getUserTasks(userId);
      getUserFilters(userId);
      if (userError) {
        history.pushState(null, null, '/');
        history.go();
      }
    };
    fetchData();
  },
  [userId, userError]);

  if (isFetchingUser || isFetchingTasks || isFetchingFilters) {
    return (
      <div className="grid-container">
        <h1>Loading your data</h1>
      </div>
    );
  }

  return (
    <div className="grid-container">
      <Header />
      <Sidenav />
      <FilteredMain />
      <Footer />
      {newTaskPopup
        && (
          <NewTask />
        )
      }
      {editTaskPopup
        && (
          <EditTask />
        )
      }
    </div>
  );
};

App.propTypes = {
  getUserTasks: PropTypes.func.isRequired,
  getUserFilters: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  newTaskPopup: PropTypes.bool.isRequired,
  editTaskPopup: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  userError: PropTypes.string.isRequired,
  isFetchingTasks: PropTypes.bool.isRequired,
  isFetchingUser: PropTypes.bool.isRequired,
  isFetchingFilters: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, {
  getUserFilters,
  getUser,
  getUserTasks,
})(App);
