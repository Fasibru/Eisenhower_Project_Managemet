import React from 'react';
import PropTypes from 'prop-types';

const TaskFormCategory = ({ category = 'A', handleChange }) => (
  <label htmlFor="category" className="Task__category">
    <p>Category</p>
    <input
      type="radio"
      className="Task__category--no-left-margin"
      name="category"
      value="A"
      onChange={handleChange}
      defaultChecked={category === 'A'}
    />A
    <input
      type="radio"
      name="category"
      value="B"
      onChange={handleChange}
      defaultChecked={category === 'B'}
    />B
    <input
      type="radio"
      name="category"
      value="C"
      onChange={handleChange}
      defaultChecked={category === 'C'}
    />C
    <input
      type="radio"
      name="category"
      value="D"
      onChange={handleChange}
      defaultChecked={category === 'D'}
    />D
  </label>
);

TaskFormCategory.propTypes = {
  category: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

export default TaskFormCategory;
