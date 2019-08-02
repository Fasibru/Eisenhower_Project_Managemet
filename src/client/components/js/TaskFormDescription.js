import React from 'react';
import PropTypes from 'prop-types';

const TaskFormDescription = ({ description, handleChange }) => (
  <label htmlFor="description" className="Task__description">
    <p>Description</p>
    <textarea
      type="text"
      name="description"
      value={description}
      onChange={handleChange}
      required
    />
  </label>
);

TaskFormDescription.propTypes = {
  description: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TaskFormDescription;
