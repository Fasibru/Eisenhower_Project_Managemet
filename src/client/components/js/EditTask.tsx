import axios from 'axios';
import * as React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  closeEditTaskPopup,
  deleteTask,
  saveEditedTask,
  storeEditTaskFormChange,
} from '../../actions/actionsTasks';

import '../scss/EditTask.scss';
import '../scss/TaskForm.scss';

import TaskFormCategory from './TaskFormCategory';
import TaskFormDescription from './TaskFormDescription';
import TaskFormTitle from './TaskFormTitle';
import TaskWarningNote from './TaskWarningNote';

import { Filter, Store, TaskType } from '../../../types/storeTypes';
import { TaskActionsTypes } from '../../../types/taskActionTypes';

interface EditTaskProps {
  filters: Filter;
  editTask: TaskType;
  closeEditTaskPopup(): TaskActionsTypes;
  deleteTask(id: string): TaskActionsTypes;
  saveEditedTask(task: TaskType): TaskActionsTypes;
  storeEditTaskFormChange(name: string, value: boolean | string): TaskActionsTypes;
}

const mapStateToProps = (state: Store) => ({
  editTask: state.tasks.editTask,
  filters: state.filters.filters,
});

// tslint:disable-next-line: variable-name
export const EditTask: React.FC<EditTaskProps> = ({
  // tslint:disable: no-shadowed-variable
  editTask,
  filters,
  closeEditTaskPopup,
  deleteTask,
  saveEditedTask,
  storeEditTaskFormChange,
  // tslint:enable: no-shadowed-variable
}) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
    // reflect form changes in editTask state
    if (event.target.name === 'completed') {
      storeEditTaskFormChange(event.target.name, (event.target as HTMLInputElement).checked);
    } else {
      storeEditTaskFormChange(event.target.name, event.target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // save changes to the DB and if successful to UI as well
    axios.put(`/api/task/${editTask._id}`, editTask)
      .then(() => {
        // save changes in tasks array for UI
        saveEditedTask(editTask);

        // close the dialog after submit
        closeEditTaskPopup();
      })
      .catch((err) => {
        console.log(err);
        closeEditTaskPopup();
      });
  };

  // delete task from the DB and if successful in UI as well
  const handleDelete = () => {
    axios.delete(`/api/task/${editTask._id}`)
      .then(() => {
        deleteTask(editTask._id);

        // close the popup after submit
        closeEditTaskPopup();
      })
      .catch((err) => {
        console.log(err);
        closeEditTaskPopup();
      });
  };

  const violatedFilters: string[] = [];
  if (editTask.description.indexOf(filters.searchQuery) === -1
    && editTask.title.indexOf(filters.searchQuery) === -1
  ) {
    violatedFilters.push(`Search tasks: ${filters.searchQuery}`);
  }
  if (editTask.completed && filters.showTasks === 'open') {
    violatedFilters.push('Show tasks: Open');
  }
  if (!editTask.completed && filters.showTasks === 'completed') {
    violatedFilters.push('Show tasks: Completed');
  }

  return (
    <div className="Task-outer">
      <div className="Task-inner">
        <p className="Task__header">Edit the Task</p>
        <form onSubmit={handleSubmit} className="Task__form">
          <TaskFormTitle
            title={editTask.title}
            handleChange={handleChange}
          />
          <TaskFormDescription
            description={editTask.description}
            handleChange={handleChange}
          />
          <TaskFormCategory
            category={editTask.category}
            handleChange={handleChange}
          />
          <input
            type="checkbox"
            className="Task__completed"
            name="completed"
            checked={editTask.completed}
            onChange={handleChange}
          />
          Completed
          <br />
          <input
            type="submit"
            value="Save Changes"
            className="Task__btn Task__btn--margin-right"
          />
          <button
            type="button"
            onClick={handleDelete}
            className="Task__btn Task__btn--margin-right"
          >
            Delete Task
          </button>
          <button
            type="button"
            onClick={closeEditTaskPopup}
            className="Task__btn"
          >
            Cancel
          </button>
          {
            violatedFilters.length > 0 && (
              <TaskWarningNote identifier="New task" violatedFilters={violatedFilters} />
            )
          }
        </form>
      </div>
    </div>
  );
};

// EditTask.propTypes = {
//   editTask: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     category: PropTypes.oneOf(['A', 'B', 'C', 'D']).isRequired,
//     rank: PropTypes.number.isRequired,
//     _id: PropTypes.string.isRequired,
//     completed: PropTypes.bool.isRequired,
//   }).isRequired,
//   closeEditTaskPopup: PropTypes.func.isRequired,
//   storeEditTaskFormChange: PropTypes.func.isRequired,
//   saveEditedTask: PropTypes.func.isRequired,
//   deleteTask: PropTypes.func.isRequired,
// };

export default connect(mapStateToProps, {
  closeEditTaskPopup,
  deleteTask,
  saveEditedTask,
  storeEditTaskFormChange,
})(EditTask);
