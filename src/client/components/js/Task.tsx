// import PropTypes from 'prop-types';
import { faCheckSquare, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { connect } from 'react-redux';
import { TaskType } from '../../../types/storeTypes';
import { TaskActionsTypes } from '../../../types/taskActionTypes';
import {
  openEditTaskPopup,
  populateEditTaskForm,
} from '../../actions/actionsTasks';

interface TaskProps {
  task: TaskType;
  className: string;
  openEditTaskPopup(): TaskActionsTypes;
  populateEditTaskForm(task: TaskType): TaskActionsTypes;
}

// tslint:disable-next-line: variable-name
export const Task: React.FC<TaskProps> = ({
  task,
  className,
  // tslint:disable: no-shadowed-variable
  openEditTaskPopup,
  populateEditTaskForm,
  // tslint:enable: no-shadowed-variable
}) => {
  const populateEditTask = () => {
    openEditTaskPopup();
    populateEditTaskForm(task);
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

export default connect(null, { openEditTaskPopup, populateEditTaskForm })(Task);
