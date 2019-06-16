import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getTasks,
  getFilters,
} from '../../actions/index';

import Header from './Header';
import Sidenav from './Sidenav';
import FilteredMain from '../../containers/Main.container';
import Footer from './Footer';
import NewTask from './NewTask';
import EditTask from './EditTask';

import '../css/App.css';

function mapStateToProps(state) {
  return {
    newTaskPopup: state.tasks.newTaskPopup,
    editTaskPopup: state.tasks.editTaskPopup,
  };
}

export class App extends Component {
  componentDidMount = () => {
    // read initial data form DB based on filters
    // eslint-disable-next-line no-shadow
    const { getTasks, getFilters } = this.props;
    getTasks();
    getFilters();
  }

  render() {
    const {
      // eslint-disable-next-line no-shadow
      // closeNewTaskPopup,
      newTaskPopup,
      editTaskPopup,
    } = this.props;
    // const { title, description } = newTask;

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
  }
}

App.propTypes = {
  getTasks: PropTypes.func.isRequired,
  getFilters: PropTypes.func.isRequired,
  newTaskPopup: PropTypes.bool.isRequired,
  editTaskPopup: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, {
  getTasks,
  getFilters,
})(App);
