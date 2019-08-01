import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
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
  userId: state.user.userId,
  userError: state.user.userError,
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
  /* eslint-enable no-shadow */
}) => {
  useEffect(() => {
    getUser()
      .then(() => {
        if (userError) {
          history.pushState(null, null, '/');
          history.go();
          return;
        }
        getUserTasks(userId);
        getUserFilters(userId);
      });
  });

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
};

export default connect(mapStateToProps, {
  getUserFilters,
  getUser,
  getUserTasks,
})(App);
