import axios from 'axios';
// tslint:disable-next-line: import-name
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  closeNewTaskPopup,
  saveNewTask,
  storeNewTaskFormChange,
} from '../../actions/actionsTasks';

import '../scss/NewTask.scss';
import '../scss/TaskForm.scss';

import TaskFormCategory from './TaskFormCategory';
import TaskFormDescription from './TaskFormDescription';
import TaskFormTitle from './TaskFormTitle';

import { Filter, NewTaskType, Store, TaskType } from '../../../types/storeTypes';
import { TaskActionsTypes } from '../../../types/taskActionTypes';

import TaskWarningNote from './TaskWarningNote';

interface NewTaskProps {
  filters: Filter;
  newTask: NewTaskType;
  userId: string;
  closeNewTaskPopup(): TaskActionsTypes;
  saveNewTask(task: TaskType): TaskActionsTypes;
  storeNewTaskFormChange(name: string, value: boolean | string): TaskActionsTypes;
}

const mapStateToProps = (state: Store) => ({
  filters: state.filters.filters,
  newTask: state.tasks.newTask,
  userId: state.user.userId,
});

// tslint:disable-next-line: variable-name
export const NewTask: React.FC<NewTaskProps> = ({
  // tslint:disable: no-shadowed-variable
  filters,
  newTask,
  userId,
  closeNewTaskPopup,
  saveNewTask,
  storeNewTaskFormChange,
  // tslint:enable: no-shadowed-variable
}) => {

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
    // reflect form changes in newTask state
    if (event.target.name === 'completed') {
      storeNewTaskFormChange(event.target.name, (event.target as HTMLInputElement).checked);
    } else {
      storeNewTaskFormChange(event.target.name, event.target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('/api/task', { ...newTask, members: [userId] })
      .then((res) => {
        saveNewTask(res.data);
        closeNewTaskPopup();
      })
      .catch((err) => {
        console.log(err);
        closeNewTaskPopup();
      });
  };

  const violatedFilters: string[] = [];
  if (newTask.description.indexOf(filters.searchQuery) === -1
    && newTask.title.indexOf(filters.searchQuery) === -1
  ) {
    violatedFilters.push(`Search tasks: ${filters.searchQuery}`);
  }
  if (newTask.completed && filters.showTasks === 'open') {
    violatedFilters.push('Show tasks: Open');
  }
  if (!newTask.completed && filters.showTasks === 'completed') {
    violatedFilters.push('Show tasks: Completed');
  }
  if (
    new Date(filters.dateRangeEnd.substr(0, 10)).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0)
  ) {
    violatedFilters.push('Creation date outside defined date range');
  }

  return (
    <div className="Task-outer">
      <div className="Task-inner">
        <p className="Task__header">Define a new Task</p>
        <form onSubmit={handleSubmit} className="Task__form">
          <TaskFormTitle
            title={newTask.title}
            handleChange={handleChange}
          />
          <TaskFormDescription
            description={newTask.description}
            handleChange={handleChange}
          />
          <TaskFormCategory
            category={newTask.category}
            handleChange={handleChange}
          />
          <input
            type="checkbox"
            className="Task__completed"
            name="completed"
            defaultChecked={false}
            onChange={handleChange}
          />
          Completed
          <br />
          <input
            type="submit"
            value="Add Task"
            className="Task__btn Task__btn--margin-right"
          />
          <button
            type="button"
            onClick={closeNewTaskPopup}
            className="Task__btn"
          >
            Cancel
          </button>
          {
            // (newTask.completed && filters.showTasks === 'open')
            //   || (!newTask.completed && filters.showTasks === 'completed')
            // ? (
            // <p>Task does not match current status filter settings.</p>
            // ) : null
            violatedFilters.length > 0 && (
              // <TaskWarningNote identifier="New task" violatedFilters={violatedFilters.values} />
              <TaskWarningNote identifier="New task" violatedFilters={violatedFilters}/>
            )
          }
        </form>
      </div>
    </div>
  );
};

// NewTask.propTypes = {
//   closeNewTaskPopup: PropTypes.func.isRequired,
//   storeNewTaskFormChange: PropTypes.func.isRequired,
//   saveNewTask: PropTypes.func.isRequired,
//   newTask: PropTypes.shape({
//     title: PropTypes.string,
//     description: PropTypes.string,
//     category: PropTypes.oneOf(['A', 'B', 'C', 'D']),
//     rank: PropTypes.number,
//     _id: PropTypes.string,
//   }).isRequired,
//   userId: PropTypes.string.isRequired,
// };

export default connect(mapStateToProps, {
  closeNewTaskPopup,
  saveNewTask,
  storeNewTaskFormChange,
})(NewTask);
