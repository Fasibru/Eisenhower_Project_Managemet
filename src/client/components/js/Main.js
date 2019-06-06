import React from 'react';
import PropTypes from 'prop-types';
import '../css/Main.css';
import '../css/Task.css';
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
            className="task task-category-A"
            key={task._id}
            task={task}
          />,
        );
        break;

      case 'B':
        categorizedFilteredTasks.TasksCatB.push(
          <Task
            className="task task-category-B"
            key={task._id}
            task={task}
          />,
        );
        break;

      case 'C':
        categorizedFilteredTasks.TasksCatC.push(
          <Task
            className="task task-category-C"
            key={task._id}
            task={task}
          />,
        );
        break;

      case 'D':
        categorizedFilteredTasks.TasksCatD.push(
          <Task
            className="task task-category-D"
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

function Main({ filteredTasksRedux }) {
  const categorizedFilteredTasks = categorizeFilteredTasks(
    filteredTasksRedux,
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
  filteredTasksRedux: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Main;
