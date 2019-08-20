// import PropTypes from 'prop-types';
import { faCheckSquare, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import { TaskType } from '../../../types/storeTypes';
import { TaskActionsTypes } from '../../../types/taskActionTypes';
import {
  deleteTask,
  openEditTaskPopup,
  populateEditTaskForm,
  saveEditedTask,
} from '../../actions/actionsTasks';

interface TaskProps {
  task: TaskType;
  className: string;
  deleteTask(id: string): TaskActionsTypes;
  openEditTaskPopup(): TaskActionsTypes;
  populateEditTaskForm(task: TaskType): TaskActionsTypes;
  saveEditedTask(task: TaskType): TaskActionsTypes;
}

// tslint:disable-next-line: variable-name
export const Task: React.FC<TaskProps> = ({
  task,
  className,
  // tslint:disable: no-shadowed-variable
  deleteTask,
  openEditTaskPopup,
  populateEditTaskForm,
  saveEditedTask,
  // tslint:enable: no-shadowed-variable
}) => {
  const populateEditTask = () => {
    openEditTaskPopup();
    populateEditTaskForm(task);
  };

  const toggleTaskStatus = () => {
    const editedTask = {
      ...task,
      completed: !task.completed,
    };

    axios.put(`/api/task/${editedTask._id}`, editedTask)
      .then(() => {
        saveEditedTask(editedTask);
      })
      .catch(err => console.log(err));
  };

  const handleDeleteTask = () => {
    axios.delete(`/api/task/${task._id}`)
      .then(() => {
        deleteTask(task._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className={className}
      onDoubleClick={populateEditTask}
    >
      <p className="task__title--bold">{task.title}</p>
      <p style={{ whiteSpace: 'pre-wrap' }}>{task.description}</p>
      <p className="task__interaction-icons">
        <button
          type="button"
          className="task__interaction-icon-button
            task__interaction-icon--push-right"
          onClick={populateEditTask}
          onMouseDown={e => e.preventDefault()} /* to remove focus after button is clicked */
        >
          <FontAwesomeIcon
            icon={faPen}
            // className="task__interaction-icon--push-right"
          />
        </button>
        <button
          type="button"
          className="task__interaction-icon-button
            task__interaction-icon--increased-margin"
          onClick={toggleTaskStatus}
          onMouseDown={e => e.preventDefault()} /* to remove focus after button is clicked */
        >
          <FontAwesomeIcon
            icon={faCheckSquare}
            // className="task__interaction-icon--increased-margin"
          />
        </button>
        <button
          type="button"
          className="task__interaction-icon-button"
          onClick={handleDeleteTask}
          onMouseDown={e => e.preventDefault()} /* to remove focus after button is clicked */
        >
          <FontAwesomeIcon
            icon={faTrash}
          />
        </button>
      </p>
    </div>
  );
};

// Task.propTypes = {
//   className: PropTypes.string.isRequired,
//   task: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     category: PropTypes.string.isRequired,
//     rank: PropTypes.number.isRequired,
//     _id: PropTypes.string.isRequired,
//   }).isRequired,
//   populateEditTaskForm: PropTypes.func.isRequired,
//   openEditTaskPopup: PropTypes.func.isRequired,
// };

export default connect(null, {
  deleteTask,
  openEditTaskPopup,
  populateEditTaskForm,
  saveEditedTask,
})(Task);
