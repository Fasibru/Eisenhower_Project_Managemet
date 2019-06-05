import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getTasks,
  addNewTask,
  deleteTask,
  getFilters,
  toggleNewTaskPopup,
  openNewTaskPopup,
  closeNewTaskPopup,
  resetNewTaskState,
  openEditTaskPopup,
  closeEditTaskPopup,
  resetEditTaskState,
  storeEditTaskFormChange,
  populateEditTaskForm,
  saveEditedTask,
  storeNewTaskFormChange,
  updateFilters,
} from '../../actions/index';

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
    filteredTasksRedux: state.filteredTasksRedux,
    filtersRedux: state.filtersRedux,
    newTaskPopup: state.newTaskPopup,
    editTaskPopupRedux: state.editTaskPopupRedux,
    editTaskRedux: state.editTaskRedux,
    newTaskRedux: state.newTaskRedux,
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
    // ############### Redux ###############
    // read initial data form DB based on filters
    // eslint-disable-next-line no-shadow
    const { getTasks, getFilters } = this.props;
    getTasks();
    getFilters();

    // ############### Original ###############
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
    // only relevant for 'close' button on EditTask Form
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
  };

  populateEditTask = (data) => {
    // ############### Redux ###############
    const {
      // eslint-disable-next-line no-shadow
      populateEditTaskForm,
      // eslint-disable-next-line no-shadow
      openEditTaskPopup,
    } = this.props;
    // open dialog
    openEditTaskPopup();
    // populate editTask based on data of double clicked task
    populateEditTaskForm(data);

    // ############### Original ###############
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

    // ############### Redux ###############
    const {
      // eslint-disable-next-line no-shadow
      closeNewTaskPopup,
      // eslint-disable-next-line no-shadow
      resetNewTaskState,
      // eslint-disable-next-line no-shadow
      newTaskRedux,
      // eslint-disable-next-line no-shadow
      addNewTask,
    } = this.props;
    addNewTask(newTaskRedux);

    // ############### ORIGINAL ###############
    const { newTask, filteredTasks } = this.state;
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
    // ############### original ###############

    // reset editTask
    resetNewTaskState();

    // close the popup
    closeNewTaskPopup();
  }

  // update newTask object based on form input in NewTask component:
  handleNewTaskFormChange = (event) => {
    // ############### Redux ###############
    // eslint-disable-next-line no-shadow
    const { storeNewTaskFormChange } = this.props;
    if (event.target.name === 'completed') {
      storeNewTaskFormChange(event.target.name, event.target.checked);
    } else {
      storeNewTaskFormChange(event.target.name, event.target.value);
    }


    // ############### ORIGINAL ###############
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

    // ############### Redux ###############
    const {
      editTaskRedux,
      filteredTasksRedux,
      // eslint-disable-next-line no-shadow
      saveEditedTask,
      // eslint-disable-next-line no-shadow
      resetEditTaskState,
      // eslint-disable-next-line no-shadow
      closeEditTaskPopup,
    } = this.props;

    // find index of task to update:
    const editTaskIndexRedux = filteredTasksRedux.findIndex(task => task._id === editTaskRedux._id);
    // save changes in filteredTasks array as well to avoid additional GET of all tasks
    saveEditedTask(editTaskRedux, editTaskIndexRedux);

    // reset editTask
    resetEditTaskState();

    // close the dialog after submit
    closeEditTaskPopup();

    // Need to work on the respective API for the route
    // // save changes to the DB
    // axios.put(`/api/task/${editTaskRedux._id}`, editTaskRedux)
    //   .catch((err) => {
    //     console.log(err);
    //   });


    // ############### ORIGINAL ###############
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
    const { editTask } = this.state; // Original

    // eslint-disable-next-line no-shadow
    const { storeEditTaskFormChange } = this.props; // Redux
    // reflect form changes in editTask state
    if (event.target.name === 'completed') {
      editTask[event.target.name] = event.target.checked; // Original
      storeEditTaskFormChange(event.target.name, event.target.checked); // Redux
    } else {
      editTask[event.target.name] = event.target.value; // Original
      storeEditTaskFormChange(event.target.name, event.target.value); // Redux
    }

    // Original
    // reflect form changes in editTask
    this.setState({
      editTask,
    });
  };

  // delete a task from within the EditTask popup
  handleDeleteTask = () => {
    // ############### Redux ###############
    const {
      // eslint-disable-next-line no-shadow
      closeEditTaskPopup,
      // eslint-disable-next-line no-shadow
      resetEditTaskState,
      // eslint-disable-next-line no-shadow
      filteredTasksRedux,
      // eslint-disable-next-line no-shadow
      editTaskRedux,
      // eslint-disable-next-line no-shadow
      deleteTask,
    } = this.props;

    // axios.delete(`/api/task/${editTaskRedux._id}`)
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // remove deleted task from filteredTasks array
    const deleteTaskIndexRedux = filteredTasksRedux
      .findIndex(task => task._id === editTaskRedux._id);
    deleteTask(deleteTaskIndexRedux);

    // reset editTask state
    resetEditTaskState();

    // close the popup after submit
    closeEditTaskPopup();

    // ############### ORIGINAL ###############
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
    // ############### Redux ###############
    // eslint-disable-next-line no-shadow
    const { updateFilters, filtersRedux } = this.props;
    updateFilters(event.target.name, event.target.value);

    axios.put('/api/filters', Object.assign({}, filtersRedux, {
      [event.target.name]: event.target.value,
    }));

    // now I need to dispatch an action to update the tasks based on the filter criteria
    // or I do that in a wrapper/container

    // ############### ORIGINAL ###############
    const { filters } = this.state;

    filters.showTasks = event.target.value;

    // axios.put('/api/updateFilters', filters)
    //   .then((res) => {
    //     this.setState({
    //       filters: res.data.filters[0],
    //       filteredTasks: res.data.tasks,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
      openNewTaskPopup,
      // eslint-disable-next-line no-shadow
      closeNewTaskPopup,
      newTaskPopup,
    } = this.props;
    const { title, description } = newTask;

    return (
      <div className="grid-container">
        <Header />
        <Sidenav
          openNewTaskPopup={openNewTaskPopup}
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
            closeNewTaskPopup={closeNewTaskPopup}
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
  addNewTask: PropTypes.func.isRequired,
  getTasks: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  getFilters: PropTypes.func.isRequired,
  // toggleNewTaskPopup: PropTypes.func.isRequired,
  openNewTaskPopup: PropTypes.func.isRequired,
  closeNewTaskPopup: PropTypes.func.isRequired,
  resetNewTaskState: PropTypes.func.isRequired,
  newTaskPopup: PropTypes.bool.isRequired,
  resetEditTaskState: PropTypes.func.isRequired,
  openEditTaskPopup: PropTypes.func.isRequired,
  closeEditTaskPopup: PropTypes.func.isRequired,
  storeEditTaskFormChange: PropTypes.func.isRequired,
  populateEditTaskForm: PropTypes.func.isRequired,
  editTaskRedux: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.oneOf(['A', 'B', 'C', 'D']),
    rank: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
  newTaskRedux: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.oneOf(['A', 'B', 'C', 'D']),
    rank: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
  filteredTasksRedux: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveEditedTask: PropTypes.func.isRequired,
  storeNewTaskFormChange: PropTypes.func.isRequired,
  updateFilters: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  addNewTask,
  getTasks,
  getFilters,
  toggleNewTaskPopup,
  openNewTaskPopup,
  closeNewTaskPopup,
  resetNewTaskState,
  resetEditTaskState,
  openEditTaskPopup,
  closeEditTaskPopup,
  storeEditTaskFormChange,
  populateEditTaskForm,
  saveEditedTask,
  deleteTask,
  storeNewTaskFormChange,
  updateFilters,
})(App);
