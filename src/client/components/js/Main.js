/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import '../scss/Main.scss';
import '../scss/Task.scss';
import Task from './Task';

const categorizeFilteredTasks = (filteredTasks) => {
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
            className="task task--red"
            key={task._id}
            task={task}
          />,
        );
        break;

      case 'B':
        categorizedFilteredTasks.TasksCatB.push(
          <Task
            className="task task--orange"
            key={task._id}
            task={task}
          />,
        );
        break;

      case 'C':
        categorizedFilteredTasks.TasksCatC.push(
          <Task
            className="task task--green"
            key={task._id}
            task={task}
          />,
        );
        break;

      case 'D':
        categorizedFilteredTasks.TasksCatD.push(
          <Task
            className="task task--lightgray"
            key={task._id}
            task={task}
          />,
        );
        break;

      default:
        console.log(`There seems to be no category assigned to the following task: ${task}`);
    }
  });
  return categorizedFilteredTasks;
};

function Main({ filteredTasks }) {
  const categorizedFilteredTasks = categorizeFilteredTasks(
    filteredTasks,
  );

  return (
    <main className="main" id="main">
      <div className="main__column-category">
        <span>Important and Urgent</span>
        {categorizedFilteredTasks.TasksCatA}
      </div>
      <div className="main__column-category">
        <span>Important</span>
        {categorizedFilteredTasks.TasksCatB}
      </div>
      <div className="main__column-category">
        <span>Urgent</span>
        {categorizedFilteredTasks.TasksCatC}
      </div>
      <div className="main__column-category">
        <span>Not Important and not Urgent</span>
        {categorizedFilteredTasks.TasksCatD}
      </div>
    </main>
  );
}

Main.propTypes = {
  filteredTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Main;
