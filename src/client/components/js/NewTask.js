import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  closeNewTaskPopup,
  storeNewTaskFormChange,
  addNewTask,
} from '../../actions/actionsTasks';
import '../scss/NewTask.scss';

const mapStateToProps = state => ({
  newTask: state.tasks.newTask,
  userId: state.user.userId,
});

export function NewTask(props) {
  const {
    // eslint-disable-next-line no-shadow
    closeNewTaskPopup,
    // eslint-disable-next-line no-shadow
    storeNewTaskFormChange,
    // eslint-disable-next-line no-shadow
    addNewTask,
    newTask,
    userId,
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
    // addNewTask(newTask);
    addNewTask({ ...newTask, members: [userId] });
    closeNewTaskPopup();
  };

  return (
    <div className="newTask-outer">
      <div className="newTask-inner">
        <p className="newTask__header">Define a new Task</p>
        <form onSubmit={handleSubmit} className="newTask__form">
          <label htmlFor="title">
            <p className="newTask__title">Title</p>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="description" className="newTask__description">
            <p>Description</p>
            <textarea
              type="text"
              name="description"
              value={newTask.description}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="category" className="newTask__category">
            <p>Category</p>
            <input type="radio" className="newTask__category--no-left-margin" name="category" value="A" onChange={handleChange} />A
            <input type="radio" name="category" value="B" onChange={handleChange} />B
            <input type="radio" name="category" value="C" onChange={handleChange} />C
            <input type="radio" name="category" value="D" onChange={handleChange} />D
          </label>
          {/* <br /> */}
          <input
            type="checkbox"
            className="newTask__completed"
            name="completed"
            defaultChecked={false}
            onChange={handleChange}
          />
          Completed
          <br />
          <input type="submit" value="Add Task" className="newTask__btn newTask__btn--margin-right" />
          <button
            type="button"
            onClick={closeNewTaskPopup}
            className="newTask__btn"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

NewTask.propTypes = {
  closeNewTaskPopup: PropTypes.func.isRequired,
  storeNewTaskFormChange: PropTypes.func.isRequired,
  addNewTask: PropTypes.func.isRequired,
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
  addNewTask,
})(NewTask);
