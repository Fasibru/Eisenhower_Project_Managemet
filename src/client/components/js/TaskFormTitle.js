import React from 'react';
import PropTypes from 'prop-types';

const TaskFormTitle = ({ title, handleChange }) => (
  <label htmlFor="title">
    <p className="Task__title">Title</p>
    <input
      type="text"
      className="Task__title-input"
      name="title"
      value={title}
      onChange={handleChange}
      required
    />
  </label>
);

TaskFormTitle.propTypes = {
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TaskFormTitle;
