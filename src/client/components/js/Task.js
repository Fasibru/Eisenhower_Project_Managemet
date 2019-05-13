import React from 'react';
import PropTypes from 'prop-types';

function Task(props) {
  const { className, title, description } = props;
  return (
    <div className={className} onDoubleClick={() => console.log('TEST')}>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
}

Task.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Task;
