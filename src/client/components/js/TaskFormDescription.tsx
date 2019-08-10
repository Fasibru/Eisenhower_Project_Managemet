import * as PropTypes from 'prop-types';
import * as React from 'react';

interface TaskFormDescriptionProps {
  description: string;
  handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
}

const TaskFormDescription = ({ description, handleChange }: TaskFormDescriptionProps) => (
  <label htmlFor="description" className="Task__description">
    <p>Description</p>
    <textarea
      name="description"
      value={description}
      onChange={handleChange}
      required={true}
    />
  </label>
);

TaskFormDescription.propTypes = {
  description: PropTypes.string.isRequired,
  // handleChange: PropTypes.func.isRequired,
};

export default TaskFormDescription;
