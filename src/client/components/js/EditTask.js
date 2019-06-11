import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  closeEditTaskPopup,
  storeEditTaskFormChange,
  saveEditedTask,
  deleteTask,
} from '../../actions/index';
import '../css/EditTask.css';

const mapStateToProps = state => ({
  editTask: state.tasks.editTaskRedux,
  filteredTasks: state.tasks.filteredTasksRedux,
  tasks: state.tasks.tasks,
});

function EditTask(props) {
  const {
    // eslint-disable-next-line no-shadow
    closeEditTaskPopup,
    // eslint-disable-next-line no-shadow
    storeEditTaskFormChange,
    // eslint-disable-next-line no-shadow
    editTask,
    // eslint-disable-next-line no-shadow
    tasks,
    // eslint-disable-next-line no-shadow
    saveEditedTask,
    // eslint-disable-next-line no-shadow
    deleteTask,
  } = props;

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

    // save changes to the DB
    axios.put(`/api/task/${editTask._id}`, editTask)
      .catch((err) => {
        console.log(err);
      });

    // find index of task to update:
    const editTaskIndex = tasks.findIndex(task => task._id === editTask._id);

    // save changes in filteredTasks array as well to avoid additional GET of all tasks
    saveEditedTask(editTask, editTaskIndex);

    // close the dialog after submit
    closeEditTaskPopup();
  };

  const handleDelete = () => {
    axios.delete(`/api/task/${editTask._id}`)
      .catch((err) => {
        console.log(err);
      });

    // remove deleted task from tasks array
    const deleteTaskIndex = tasks
      .findIndex(task => task._id === editTask._id);
    deleteTask(deleteTaskIndex);

    // close the popup after submit
    closeEditTaskPopup();
  };

  // check the category of editTask for later setting of defaultChecked
  let categoryA = false;
  let categoryB = false;
  let categoryC = false;
  let categoryD = false;

  switch (editTask.category) {
    case 'A':
      categoryA = true;
      break;
    case 'B':
      categoryB = true;
      break;
    case 'C':
      categoryC = true;
      break;
    case 'D':
      categoryD = true;
      break;
    default:
      console.error('No proper category provided');
  }

  return (
    <div className="editTask-outer">
      <div className="editTask-inner">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">
            Title<br />
            <input type="text" defaultValue={editTask.title} name="title" onChange={handleChange} />
          </label>
          <br />
          <label htmlFor="description">
            Description<br />
            <textarea type="text" name="description" defaultValue={editTask.description} onChange={handleChange} />
          </label>
          <br />
          <label htmlFor="category">
            Category<br />
            <input type="radio" name="category" value="A" onChange={handleChange} defaultChecked={categoryA} />A
            <input type="radio" name="category" value="B" onChange={handleChange} defaultChecked={categoryB} />B
            <input type="radio" name="category" value="C" onChange={handleChange} defaultChecked={categoryC} />C
            <input type="radio" name="category" value="D" onChange={handleChange} defaultChecked={categoryD} />D
          </label>
          <br />
          <input type="checkbox" name="completed" checked={editTask.completed} onChange={handleChange} />Completed
          <br />
          <input type="submit" value="Save" />
          <button type="button" onClick={closeEditTaskPopup}>Close</button>
          <button type="button" onClick={handleDelete}>Delete</button>
        </form>
      </div>
    </div>
  );
}

EditTask.propTypes = {
  editTask: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.oneOf(['A', 'B', 'C', 'D']).isRequired,
    rank: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
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
