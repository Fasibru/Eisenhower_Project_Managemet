import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  closeNewTaskPopup,
  storeNewTaskFormChange,
  addNewTask,
} from '../../actions/index';
import '../scss/NewTask.scss';

const mapStateToProps = state => ({
  newTask: state.tasks.newTask,
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
    addNewTask(newTask);
    closeNewTaskPopup();
  };

  return (
    <div className="newTask-outer">
      <div className="newTask-inner">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">
            Title<br />
            <input type="text" name="title" value={newTask.title} onChange={handleChange} required />
          </label>
          <br />
          <label htmlFor="description">
            Description<br />
            <textarea type="text" name="description" value={newTask.description} onChange={handleChange} required />
          </label><br />
          <label htmlFor="category">
            Category<br />
            <input type="radio" name="category" value="A" onChange={handleChange} />A
            <input type="radio" name="category" value="B" onChange={handleChange} />B
            <input type="radio" name="category" value="C" onChange={handleChange} />C
            <input type="radio" name="category" value="D" onChange={handleChange} />D
          </label>
          <br />
          <input type="checkbox" name="completed" defaultChecked={false} onChange={handleChange} />Completed
          <br />
          <input type="submit" value="Add Task" />
          <button type="button" onClick={closeNewTaskPopup}>Close</button>
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
};

export default connect(mapStateToProps, {
  closeNewTaskPopup,
  storeNewTaskFormChange,
  addNewTask,
})(NewTask);
