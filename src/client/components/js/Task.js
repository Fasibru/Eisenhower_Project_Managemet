import React from 'react';
import PropTypes from 'prop-types';

function Task(props) {
  const {
    className,
    title,
    description,
    toggleEditTaskPopup,
  } = props;
  return (
    <div className={className} onDoubleClick={toggleEditTaskPopup}>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
}

Task.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  toggleEditTaskPopup: PropTypes.func.isRequired,
};

export default Task;
