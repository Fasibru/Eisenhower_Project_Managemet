import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  closeNewTaskPopup,
  storeNewTaskFormChange,
  saveNewTask,
} from '../../actions/actionsTasks';

import '../scss/NewTask.scss';
import '../scss/TaskForm.scss';

import TaskFormTitle from './TaskFormTitle';
import TaskFormDescription from './TaskFormDescription';
import TaskFormCategory from './TaskFormCategory';

const mapStateToProps = state => ({
  newTask: state.tasks.newTask,
  userId: state.user.userId,
});

export function NewTask(props) {
  const {
    /* eslint-disable no-shadow */
    closeNewTaskPopup,
    storeNewTaskFormChange,
    saveNewTask,
    newTask,
    userId,
    /* eslint-enable no-shadow */
  } = props;

  const handleChange = (event) => {
    // reflect form changes in newTask state
    if (event.target.name === 'completed') {
      storeNewTaskFormChange(event.target.name, event.target.checked);
    } else {
      storeNewTaskFormChange(event.target.name, event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/task', { ...newTask, members: [userId] })
      .then((res) => {
        saveNewTask(res.data);
        closeNewTaskPopup();
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="Task-outer">
      <div className="Task-inner">
        <p className="Task__header">Define a new Task</p>
        <form onSubmit={handleSubmit} className="Task__form">
          <TaskFormTitle
            title={newTask.title}
            handleChange={handleChange}
          />
          <TaskFormDescription
            description={newTask.description}
            handleChange={handleChange}
          />
          <TaskFormCategory
            category={newTask.category}
            handleChange={handleChange}
          />
          <input
            type="checkbox"
            className="Task__completed"
            name="completed"
            defaultChecked={false}
            onChange={handleChange}
          />
          Completed
          <br />
          <input
            type="submit"
            value="Add Task"
            className="Task__btn Task__btn--margin-right"
          />
          <button
            type="button"
            onClick={closeNewTaskPopup}
            className="Task__btn"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

NewTask.propTypes = {
  closeNewTaskPopup: PropTypes.func.isRequired,
  storeNewTaskFormChange: PropTypes.func.isRequired,
  saveNewTask: PropTypes.func.isRequired,
  newTask: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.oneOf(['A', 'B', 'C', 'D']),
    rank: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
  userId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {
  closeNewTaskPopup,
  storeNewTaskFormChange,
  saveNewTask,
})(NewTask);
