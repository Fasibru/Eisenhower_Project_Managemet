import axios from 'axios';
import * as React from 'react';
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

import { NewTaskType, Store, TaskType } from '../../../types/storeTypes';
import { TaskActionsTypes } from '../../../types/taskActionTypes';

interface NewTaskProps {
  newTask: NewTaskType;
  userId: string;
  closeNewTaskPopup(): TaskActionsTypes;
  saveNewTask(task: TaskType): TaskActionsTypes;
  storeNewTaskFormChange(name: string, value: boolean | string): TaskActionsTypes;
}

const mapStateToProps = (state: Store) => ({
  newTask: state.tasks.newTask,
  userId: state.user.userId,
});

// tslint:disable-next-line: variable-name
export const NewTask: React.FC<NewTaskProps> = ({
  // tslint:disable: no-shadowed-variable
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
