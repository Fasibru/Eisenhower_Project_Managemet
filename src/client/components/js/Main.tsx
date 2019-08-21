/* eslint-disable no-undef */
import * as React from 'react';
// import PropTypes from 'prop-types';

import '../scss/Main.scss';
import '../scss/Task.scss';

import Task from './Task';

import { TaskType } from '../../../types/storeTypes';

interface TasksCatProps {
  className: string;
  key: string;
  task: TaskType;
}

interface CategorizeFilteredTasks {
  TasksCatA: Array<React.ReactElement<TasksCatProps>>;
  TasksCatB: Array<React.ReactElement<TasksCatProps>>;
  TasksCatC: Array<React.ReactElement<TasksCatProps>>;
  TasksCatD: Array<React.ReactElement<TasksCatProps>>;
}

interface MainProps {
  filteredTasks: TaskType[];
}

const categorizeFilteredTasks = (filteredTasks: TaskType[]) => {
  const categorizedFilteredTasks: CategorizeFilteredTasks = {
    TasksCatA: [],
    TasksCatB: [],
    TasksCatC: [],
    TasksCatD: [],
  };

  // sort filteredTasks array based on rank
  // filteredTasks.sort((a, b) => {
  //   if (a.rank > b.rank) {
  //     return 1;
  //   }
  //   if (a.rank < b.rank) {
  //     return -1;
  //   }
  //   return 0;
  // });

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

// tslint:disable-next-line: variable-name
const Main: React.FC<MainProps> = ({ filteredTasks }) => {
  const categorizedFilteredTasks = categorizeFilteredTasks(filteredTasks);

  return (
    <main className="main" id="main">
      <div className="main__column-category main__column-A">
        <span
          className="main__column-header"
        >
          Important and Urgent ({categorizedFilteredTasks.TasksCatA.length})
        </span>
        {categorizedFilteredTasks.TasksCatA}
      </div>
      <div className="main__column-category main__column-B">
        <span
          className="main__column-header"
        >
          Important ({categorizedFilteredTasks.TasksCatB.length})
        </span>
        {categorizedFilteredTasks.TasksCatB}
      </div>
      <div className="main__column-category main__column-C">
        <span
          className="main__column-header">
          Urgent ({categorizedFilteredTasks.TasksCatC.length})
        </span>
        {categorizedFilteredTasks.TasksCatC}
      </div>
      <div className="main__column-category main__column-D">
        <span
          className="main__column-header"
        >
          Not Important and not Urgent ({categorizedFilteredTasks.TasksCatD.length})
        </span>
        {categorizedFilteredTasks.TasksCatD}
      </div>
    </main>
  );
};

// Main.propTypes = {
//   filteredTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

export default Main;
