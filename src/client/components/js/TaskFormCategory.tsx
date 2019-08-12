import * as PropTypes from 'prop-types';
import * as React from 'react';

interface TaskFormCategoryProps {
  category: string;
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

// tslint:disable-next-line: variable-name
const TaskFormCategory = ({ category = 'A', handleChange }: TaskFormCategoryProps) => (
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
  // handleChange: PropTypes.func.isRequired,
};

export default TaskFormCategory;
