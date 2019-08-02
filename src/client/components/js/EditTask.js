import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  closeEditTaskPopup,
  storeEditTaskFormChange,
  saveEditedTask,
  deleteTask,
} from '../../actions/actionsTasks';
import '../scss/EditTask.scss';

import TaskFormTitle from './TaskFormTitle';
import TaskFormDescription from './TaskFormDescription';
import TaskFormCategory from './TaskFormCategory';

const mapStateToProps = state => ({
  editTask: state.tasks.editTask,
  tasks: state.tasks.tasks,
});

export const EditTask = ({
  /* eslint-disable no-shadow */
  tasks,
  editTask,
  closeEditTaskPopup,
  storeEditTaskFormChange,
  saveEditedTask,
  deleteTask,
  /* eslint-enable no-shadow */
}) => {
  const handleChange = (event) => {
    // reflect form changes in editTask state
    if (event.target.name === 'completed') {
      storeEditTaskFormChange(event.target.name, event.target.checked);
    } else {
      storeEditTaskFormChange(event.target.name, event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // save changes to the DB and if successful to UI as well
    axios.put(`/api/task/${editTask._id}`, editTask)
      .then(() => {
        // find index of task to update:
        const editTaskIndex = tasks.findIndex(task => task._id === editTask._id);

        // save changes in tasks array as well to avoid additional GET of all tasks
        saveEditedTask(editTask, editTaskIndex);

        // close the dialog after submit
        closeEditTaskPopup();
      })
      .catch((err) => {
        console.log(err);
        closeEditTaskPopup();
      });
  };

  const handleDelete = () => {
    axios.delete(`/api/task/${editTask._id}`)
      .then(() => {
        // remove deleted task from tasks array
        const deleteTaskIndex = tasks
          .findIndex(task => task._id === editTask._id);
        deleteTask(deleteTaskIndex);

        // close the popup after submit
        closeEditTaskPopup();
      })
      .catch((err) => {
        console.log(err);
        closeEditTaskPopup();
      });
  };

  return (
    <div className="Task-outer">
      <div className="Task-inner">
        <p className="Task__header">Edit the Task</p>
        <form onSubmit={handleSubmit} className="Task__form">
          <TaskFormTitle title={editTask.title} handleChange={handleChange} />
          <TaskFormDescription description={editTask.description} handleChange={handleChange} />
          <TaskFormCategory category={editTask.category} handleChange={handleChange} />
          <input
            type="checkbox"
            className="Task__completed"
            name="completed"
            checked={editTask.completed}
            onChange={handleChange}
          />
          Completed
          <br />
          <input type="submit" value="Save Changes" className="Task__btn Task__btn--margin-right" />
          <button type="button" onClick={closeEditTaskPopup} className="Task__btn Task__btn--margin-right">Close</button>
          <button type="button" onClick={handleDelete} className="Task__btn">Delete Task</button>
        </form>
      </div>
    </div>
  );
};

EditTask.propTypes = {
  editTask: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.oneOf(['A', 'B', 'C', 'D']).isRequired,
    rank: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  closeEditTaskPopup: PropTypes.func.isRequired,
  storeEditTaskFormChange: PropTypes.func.isRequired,
  saveEditedTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, {
  closeEditTaskPopup,
  storeEditTaskFormChange,
  saveEditedTask,
  deleteTask,
})(EditTask);
