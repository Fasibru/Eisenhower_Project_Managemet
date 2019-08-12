// import PropTypes from 'prop-types';
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
