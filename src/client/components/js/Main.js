// import React, { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import '../css/Main.css';
import '../css/Task.css';
import Task from './Task';

const categorizeFilteredTasks = (filteredTasks, toggleEditTaskPopup) => {
  const categorizedFilteredTasks = {
    TasksCatA: [],
    TasksCatB: [],
    TasksCatC: [],
    TasksCatD: [],
  };

  // const { toggleEditTaskPopup } = this.props;

  filteredTasks.forEach((task) => {
    switch (task.category) {
      case 'A':
        categorizedFilteredTasks.TasksCatA.push(
          <Task
            key={task._id}
            className="task task-category-A"
            title={task.title}
            description={task.description}
            toggleEditTaskPopup={toggleEditTaskPopup}
          />,
        );
        break;

      case 'B':
        categorizedFilteredTasks.TasksCatB.push(
          <Task
            key={task._id}
            className="task task-category-B"
            title={task.title}
            description={task.description}
            toggleEditTaskPopup={toggleEditTaskPopup}
          />,
        );
        break;

      case 'C':
        categorizedFilteredTasks.TasksCatC.push(
          <Task
            key={task._id}
            className="task task-category-C"
            title={task.title}
            description={task.description}
            toggleEditTaskPopup={toggleEditTaskPopup}
          />,
        );
        break;

      case 'D':
        categorizedFilteredTasks.TasksCatD.push(
          <Task
            key={task._id}
            className="task task-category-D"
            title={task.title}
            description={task.description}
            toggleEditTaskPopup={toggleEditTaskPopup}
          />,
        );
        break;

      default:
        console.log(`There seems to be no category assigned to the following task: ${task}`);
    }
  });
  return categorizedFilteredTasks;
};

function Main(props) {
  const { filteredTasks, toggleEditTaskPopup } = props;
  const categorizedFilteredTasks = categorizeFilteredTasks(filteredTasks, toggleEditTaskPopup);
  return (
    <main className="main">
      <div className="column-category">{categorizedFilteredTasks.TasksCatA}</div>
      <div className="column-category">{categorizedFilteredTasks.TasksCatB}</div>
      <div className="column-category">{categorizedFilteredTasks.TasksCatC}</div>
      <div className="column-category">{categorizedFilteredTasks.TasksCatD}</div>
    </main>
  );
}

Main.propTypes = {
  filteredTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleEditTaskPopup: PropTypes.func.isRequired,
};

export default Main;
