import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header';
import Sidenav from './Sidenav';
import Main from './Main';
import Footer from './Footer';
import NewTask from './NewTask';
import EditTask from './EditTask';

import '../css/App.css';
import { tasks } from '../../data.json'; // that's the data warehouse. 'tasks' will be passed to Sidenav where the filtering happens. Sidenav will then set the filtered tasks as the state for App. The filtered tasks will be passed as array to Main where the identification of the category happens for rendering.

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /* filteredTasks will change depending on the filters set in Sidenav once implemented */
      filteredTasks: [],
      newTaskPopup: false,
      newTask: {},
      editTaskPopup: false,
      editTask: {},
    };

    /* Only necessary to bind 'this' for this method since all others are arrow functions.
    I just left that the way it currently is for learning purposes. */

    this.handleNewTaskFormChange = this.handleNewTaskFormChange.bind(this);
  }

  componentDidMount() {
    // read initial data from DB
    axios.get('/api/tasks')
      .then((res) => {
        this.setState({
          filteredTasks: res.data,
        });
      })
      .catch(console.error);
  }

  toggleNewTaskPopup = () => {
    // callback is comparable to newTaskPopup: !this.state.newTaskPopup
    this.setState(prevState => ({ newTaskPopup: !prevState.newTaskPopup }));
  }

  toggleEditTaskPopup = () => {
    this.setState(prevState => ({ editTaskPopup: !prevState.editTaskPopup }));
  };

  populateEditTask = (data) => {
    const { editTaskPopup } = this.state;
    this.setState({
      editTaskPopup: !editTaskPopup,
      editTask: {
        _id: data._id,
        rank: data.rank,
        category: data.category,
        title: data.title,
        description: data.description,
      },
    });
  }

  // add new task to data warehouse on submit
  handleNewTaskFormSubmit = (event) => {
    event.preventDefault();

    const { newTask, filteredTasks } = this.state;
    const filteredTasksLength = filteredTasks.length;

    // POST new task and update state afterwards
    axios.post('/api/newTask', newTask)
      .then((res) => {
        // retrieve _id and rank from posted newTask
        const newTaskID = res.data._id;
        const newTaskRank = res.data.rank;

        // Instead of using a GET for all tasks just add the new task to the filteredTasks array.
        // _id and rank updated manually.
        filteredTasks.push(newTask);
        filteredTasks[filteredTasksLength]._id = newTaskID;
        filteredTasks[filteredTasksLength].rank = newTaskRank;

        // update state including the new task for re-render
        this.setState({
          filteredTasks,
        });

        // reset newTask
        this.setState({
          newTask: {},
        });
      })
      .catch(console.error);

    // close the popup after submit
    this.toggleNewTaskPopup();
  }

  handleEditTaskFormSubmit = (event) => {
    event.preventDefault();

    const { editTask } = this.state;

    axios.put(`/api/editTask/${editTask._id}`, editTask)
      .catch(console.error);
  }

  // update editTask object based on form input in EditTask component:
  handleEditTaskFormChange = (event) => {
    const { editTask } = this.state;
    editTask[event.target.name] = event.target.value;

    this.setState({
      editTask,
    });
  };

  // update newTask object based on form input in NewTask component:
  handleNewTaskFormChange(event) {
    const { newTask } = this.state;
    newTask[event.target.name] = event.target.value;

    // maybe this leads to unnecessary many re-renderings:
    this.setState({
      newTask,
    });
  }

  render() {
    const {
      filteredTasks,
      newTaskPopup,
      newTask,
      editTaskPopup,
      editTask,
    } = this.state;
    const { title, description } = newTask;

    return (
      <div className="grid-container">
        <Header />
        <Sidenav
          tasks={tasks}
          toggleNewTaskPopup={this.toggleNewTaskPopup}
        />
        <Main
          filteredTasks={filteredTasks}
          populateEditTask={this.populateEditTask}
        />
        <Footer />
        {newTaskPopup
          && (
          <NewTask
            toggleNewTaskPopup={this.toggleNewTaskPopup}
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
            />
          )
        }
      </div>
    );
  }
}

export default App;
