import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header';
import Sidenav from './Sidenav';
import Main from './Main';
import Footer from './Footer';
import NewTask from './NewTask';

import '../css/App.css';
import { tasks } from '../../data.json'; // that's the data warehouse. 'tasks' will be passed to Sidenav where the filtering happens. Sidenav will then set the filtered tasks as the state for App. The filtered tasks will be passed as array to Main where the identification of the category happens for rendering.

class App extends Component {
  constructor(props) {
    super(props);

    // this.newTask = {
    //   title: '',
    //   description: '',
    //   category: 'A', // default category
    // };

    this.state = {
      /* filteredTasks will change depending on the filters set in Sidenav once implemented */
      filteredTasks: [],
      newTaskPopup: false,
      // newTask: this.newTask,
      newTask: {},
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

  // add new task to data warehouse on submit
  handleNewTaskFormSubmit = (event) => {
    event.preventDefault();
    this.toggleNewTaskPopup();

    const { newTask } = this.state;

    /* POST new task and update state afterwards
    This looks resource intensive (unnecessary GET for all tasks)
    --> think about better implementation */
    axios.post('/api/task', newTask)
      .then(axios.get('/api/tasks')
        .then((res) => {
          this.setState({
            filteredTasks: res.data,
          });
        }))
      .catch(console.error);

    // reset newTask
    this.setState({
      newTask: {},
    });
  }

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
    const { filteredTasks, newTaskPopup, newTask } = this.state;
    const { title, description } = newTask;
    return (
      <div className="grid-container">
        <Header />
        <Sidenav
          tasks={tasks}
          toggleNewTaskPopup={this.toggleNewTaskPopup}
        />
        <Main filteredTasks={filteredTasks} />
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
      </div>
    );
  }
}

export default App;
