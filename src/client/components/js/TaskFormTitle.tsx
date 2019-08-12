import * as PropTypes from 'prop-types';
import * as React from 'react';

interface TaskFormTitleProps {
  title: string;
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

// tslint:disable-next-line: variable-name
const TaskFormTitle = ({ title, handleChange }: TaskFormTitleProps) => (
  <label htmlFor="title">
    <p className="Task__title">Title</p>
    <input
      type="text"
      className="Task__title-input"
      name="title"
      value={title}
      onChange={handleChange}
      required={true}
    />
  </label>
);

TaskFormTitle.propTypes = {
  // handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default TaskFormTitle;
