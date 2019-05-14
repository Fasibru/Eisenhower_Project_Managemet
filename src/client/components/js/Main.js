// import React, { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import '../css/Main.css';
import '../css/Task.css';
import Task from './Task';

const categorizeFilteredTasks = (filteredTasks, populateEditTask) => {
  const categorizedFilteredTasks = {
    TasksCatA: [],
    TasksCatB: [],
    TasksCatC: [],
    TasksCatD: [],
  };

  filteredTasks.forEach((task) => {
    switch (task.category) {
      case 'A':
        categorizedFilteredTasks.TasksCatA.push(
          <Task
            className="task task-category-A"
            key={task._id}
            task={task}
            populateEditTask={populateEditTask}
          />,
        );
        break;

      case 'B':
        categorizedFilteredTasks.TasksCatB.push(
          <Task
            className="task task-category-B"
            key={task._id}
            task={task}
            populateEditTask={populateEditTask}
          />,
        );
        break;

      case 'C':
        categorizedFilteredTasks.TasksCatC.push(
          <Task
            className="task task-category-C"
            key={task._id}
            task={task}
            populateEditTask={populateEditTask}
          />,
        );
        break;

      case 'D':
        categorizedFilteredTasks.TasksCatD.push(
          <Task
            className="task task-category-D"
            key={task._id}
            task={task}
            populateEditTask={populateEditTask}
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
  const { filteredTasks, populateEditTask } = props;
  const categorizedFilteredTasks = categorizeFilteredTasks(
    filteredTasks,
    populateEditTask,
  );
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
  populateEditTask: PropTypes.func.isRequired,
};

export default Main;
