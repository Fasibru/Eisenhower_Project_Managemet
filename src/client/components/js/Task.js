import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  populateEditTaskForm,
  openEditTaskPopup,
} from '../../actions/actionsTasks';

// eslint-disable-next-line no-shadow
const populateEditTask = (openEditTaskPopup, populateEditTaskForm, data) => {
  openEditTaskPopup();
  populateEditTaskForm(data);
};

export function Task(props) {
  const {
    task,
    className,
    // eslint-disable-next-line no-shadow
    openEditTaskPopup,
    // eslint-disable-next-line no-shadow
    populateEditTaskForm,
  } = props;
  return (
    <div
      className={className}
      onDoubleClick={() => populateEditTask(openEditTaskPopup, populateEditTaskForm, task)}
    >
      <p className="task__title--bold">{task.title}</p>
      <p style={{ whiteSpace: 'pre-wrap' }}>{task.description}</p>
    </div>
  );
}

Task.propTypes = {
  className: PropTypes.string.isRequired,
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  populateEditTaskForm: PropTypes.func.isRequired,
  openEditTaskPopup: PropTypes.func.isRequired,
};

export default connect(null, { openEditTaskPopup, populateEditTaskForm })(Task);
