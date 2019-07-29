import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserTasks } from '../../actions/actionsTasks';
import { getUserFilters } from '../../actions/actionsFilters';

import { getUserId } from '../../actions/actionsUser';

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
});

export class App extends Component {
  componentDidMount = () => {
    // read initial data form DB based on filters
    // eslint-disable-next-line no-shadow
    const { getUserTasks, getUserFilters, getUserId } = this.props;
    getUserId()
      .then(() => {
        const { userId } = this.props;
        getUserTasks(userId);
        getUserFilters(userId);
      });
  }

  render() {
    const {
      // eslint-disable-next-line no-shadow
      // closeNewTaskPopup,
      newTaskPopup,
      editTaskPopup,
      userId,
    } = this.props;

    return (
      <div className="grid-container">
        {!userId
          && (
            <Redirect to="/login" />
          )
        }
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
  }
}

App.propTypes = {
  getUserTasks: PropTypes.func.isRequired,
  getUserFilters: PropTypes.func.isRequired,
  getUserId: PropTypes.func.isRequired,
  newTaskPopup: PropTypes.bool.isRequired,
  editTaskPopup: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {
  getUserFilters,
  getUserId,
  getUserTasks,
})(App);
