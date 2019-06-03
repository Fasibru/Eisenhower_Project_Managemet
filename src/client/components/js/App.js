import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTasks, toggleNewTaskPopup } from '../../actions/index';

import Header from './Header';
import Sidenav from './Sidenav';
import Main from './Main';
// import FilteredMain from '../../containers/FilteredMain';
import Footer from './Footer';
import NewTask from './NewTask';
import EditTask from './EditTask';

import '../css/App.css';

function mapStateToProps(state) {
  return {
    // filteredTasksRedux: state.filteredTasksRedux,
    // filtersRedux: state.filtersRedux,
    newTaskPopup: state.newTaskPopup,
  };
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredTasks: [],
      newTask: {},
      editTaskPopup: false,
      editTask: {},
      filters: {},
    };
  }

  componentDidMount = () => {
    // read initial data form DB based on filters
    axios.get('/api/getInitialData')
      .then((res) => {
        this.setState({
          filters: res.data.filters[0],
          filteredTasks: res.data.tasks,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // const {
    //   // eslint-disable-next-line no-shadow
    //   // getTasks,
    // } = this.props;
    // getTasks();
  }

  // toggleNewTaskPopup = () => {
  //   const {
  //     // eslint-disable-next-line no-shadow
  //     toggleNewTaskPopup,
  //   } = this.props;
  //   toggleNewTaskPopup();
  // }

  toggleEditTaskPopup = () => {
    const { editTaskPopup } = this.state;
    // check if popup is already open and if yes then close it and reset editTask
    if (editTaskPopup) {
      this.setState({
        editTaskPopup: !editTaskPopup,
        editTask: {},
      });
    } else {
      this.setState({
        editTaskPopup: !editTaskPopup,
      });
    }
    // this.setState(prevState => ({ editTaskPopup: !prevState.editTaskPopup }));
  };

  populateEditTask = (data) => {
    // open popup
    this.toggleEditTaskPopup();
    // populate editTask based on data of double clicked task
    this.setState({
      editTask: {
        _id: data._id,
        rank: data.rank,
        category: data.category,
        title: data.title,
        description: data.description,
        completed: data.completed,
      },
    });
  }

  // add new task to data warehouse on submit
  handleNewTaskFormSubmit = (event) => {
    event.preventDefault();

    const { newTask, filteredTasks } = this.state;
    // eslint-disable-next-line no-shadow
    const { toggleNewTaskPopup } = this.props;
    const filteredTasksLength = filteredTasks.length;

    // POST new task and update state afterwards
    axios.post('/api/newTask', newTask)
      .then((res) => {
        // retrieve _id and rank from posted newTask
        const newTaskID = res.data._id;
        const newTaskRank = res.data.rank;
        const newTaskCompleted = res.data.completed;

        // Instead of using a GET for all tasks just add the new task to the filteredTasks array.
        // _id, rank and completed are updated manually.
        filteredTasks.push(newTask);
        filteredTasks[filteredTasksLength]._id = newTaskID;
        filteredTasks[filteredTasksLength].rank = newTaskRank;
        filteredTasks[filteredTasksLength].completed = newTaskCompleted;

        // update state including the new task for re-render
        this.setState({
          filteredTasks,
        });

        // reset newTask
        this.setState({
          newTask: {},
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // close the popup after submit
    toggleNewTaskPopup();
  }

  // update newTask object based on form input in NewTask component:
  handleNewTaskFormChange = (event) => {
    const { newTask } = this.state;
    if (event.target.name === 'completed') {
      newTask[event.target.name] = event.target.checked;
    } else {
      newTask[event.target.name] = event.target.value;
    }

    // reflect form changes in newTask
    this.setState({
      newTask,
    });
  }

  handleEditTaskFormSubmit = (event) => {
    event.preventDefault();

    const { editTask, filteredTasks } = this.state;

    // save changes to the DB
    axios.put(`/api/editTask/${editTask._id}`, editTask)
      .catch((err) => {
        console.log(err);
      });

    // save changes in filteredTasks array as well to avoid additional GET of all tasks
    // find index of task to update:
    const editTaskIndex = filteredTasks.findIndex(task => task._id === editTask._id);
    // update filteredTasks array
    filteredTasks[editTaskIndex] = editTask;

    // reset editTask
    this.setState({
      editTask: {},
    });

    // close the popup after submit
    this.toggleEditTaskPopup();
  }

  // update editTask object based on form input in EditTask component:
  handleEditTaskFormChange = (event) => {
    const { editTask } = this.state;

    if (event.target.name === 'completed') {
      editTask[event.target.name] = event.target.checked;
    } else {
      editTask[event.target.name] = event.target.value;
    }

    // reflect form changes in editTask
    this.setState({
      editTask,
    });
  };

  // delete a task from within the EditTask popup
  handleDeleteTask = () => {
    const { editTask, filteredTasks } = this.state;

    axios.delete(`/api/deleteTask/${editTask._id}`)
      .catch((err) => {
        console.log(err);
      });

    // remove deleted task from filteredTasks array
    const deleteTaskIndex = filteredTasks.findIndex(task => task._id === editTask._id);
    filteredTasks.splice(deleteTaskIndex, 1);

    // reset editTask
    this.setState({
      editTask: {},
    });

    // close the popup after submit
    this.toggleEditTaskPopup();
  };

  // handle filter to show/hide completed tasks
  handleFilterShowTasks = (event) => {
    const { filters } = this.state;

    filters.showTasks = event.target.value;

    axios.put('/api/updateFilters', filters)
      .then((res) => {
        this.setState({
          filters: res.data.filters[0],
          filteredTasks: res.data.tasks,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      filters,
      filteredTasks,
      // newTaskPopup,
      newTask,
      editTaskPopup,
      editTask,
    } = this.state;
    const {
      // filteredTasksRedux,
      // filtersRedux,
      // eslint-disable-next-line no-shadow
      toggleNewTaskPopup,
      newTaskPopup,
    } = this.props;
    const { title, description } = newTask;

    return (
      <div className="grid-container">
        <Header />
        <Sidenav
          toggleNewTaskPopup={toggleNewTaskPopup}
          filters={filters}
          handleFilterShowTasks={this.handleFilterShowTasks}
        />
        {/* <FilteredMain /> */}
        <Main
          filteredTasks={filteredTasks}
          populateEditTask={this.populateEditTask}
        />
        <Footer />
        {newTaskPopup
          && (
          <NewTask
            toggleNewTaskPopup={toggleNewTaskPopup}
            defineNewTask={this.handleNewTaskFormChange}
            submitNewTask={this.handleNewTaskFormSubmit}
            title={title}
            description={description}
          />
          )
        }
        {editTaskPopup
          && (
            <EditTask
              toggleEditTaskPopup={this.toggleEditTaskPopup}
              editTask={editTask}
              defineEditTask={this.handleEditTaskFormChange}
              submitEditTask={this.handleEditTaskFormSubmit}
              handleDeleteTask={this.handleDeleteTask}
            />
          )
        }
      </div>
    );
  }
}

App.propTypes = {
  // getTasks: PropTypes.func.isRequired,
  toggleNewTaskPopup: PropTypes.func.isRequired,
  newTaskPopup: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { toggleNewTaskPopup })(App);
