import React from 'react';
import PropTypes from 'prop-types';

function Task(props) {
  const {
    task,
    className,
    populateEditTask,
  } = props;
  return (
    <div
      className={className}
      onDoubleClick={() => populateEditTask({
        _id: task._id,
        rank: task.rank,
        category: task.category,
        title: task.title,
        description: task.description,
      })}
    >
      <p>{task.title}</p>
      <p>{task.description}</p>
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
  populateEditTask: PropTypes.func.isRequired,
};

export default Task;
