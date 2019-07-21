import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  closeEditTaskPopup,
  storeEditTaskFormChange,
  saveEditedTask,
  deleteTask,
} from '../../actions/index';
import '../scss/EditTask.scss';

const mapStateToProps = state => ({
  editTask: state.tasks.editTask,
  tasks: state.tasks.tasks,
});

export class EditTask extends Component {
  handleChange = (event) => {
    // eslint-disable-next-line no-shadow
    const { storeEditTaskFormChange } = this.props;

    // reflect form changes in editTask state
    if (event.target.name === 'completed') {
      storeEditTaskFormChange(event.target.name, event.target.checked);
    } else {
      storeEditTaskFormChange(event.target.name, event.target.value);
    }
  };

  handleSubmit = (event) => {
    const {
      editTask,
      tasks,
      // eslint-disable-next-line no-shadow
      saveEditedTask,
      // eslint-disable-next-line no-shadow
      closeEditTaskPopup,
    } = this.props;
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

  handleDelete = () => {
    const {
      editTask,
      tasks,
      // eslint-disable-next-line no-shadow
      deleteTask,
      // eslint-disable-next-line no-shadow
      closeEditTaskPopup,
    } = this.props;

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

  render() {
    const {
      // eslint-disable-next-line no-shadow
      closeEditTaskPopup,
      // eslint-disable-next-line no-shadow
      editTask,
    } = this.props;

    return (
      <div className="editTask-outer">
        <div className="editTask-inner">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="title">
              Title<br />
              <input type="text" defaultValue={editTask.title} name="title" onChange={this.handleChange} />
            </label>
            <br />
            <label htmlFor="description">
              Description<br />
              <textarea type="text" name="description" defaultValue={editTask.description} onChange={this.handleChange} />
            </label>
            <br />
            <label htmlFor="category">
              Category<br />
              <input type="radio" name="category" value="A" onChange={this.handleChange} defaultChecked={editTask.category === 'A'} />A
              <input type="radio" name="category" value="B" onChange={this.handleChange} defaultChecked={editTask.category === 'B'} />B
              <input type="radio" name="category" value="C" onChange={this.handleChange} defaultChecked={editTask.category === 'C'} />C
              <input type="radio" name="category" value="D" onChange={this.handleChange} defaultChecked={editTask.category === 'D'} />D
            </label>
            <br />
            <input type="checkbox" name="completed" checked={editTask.completed} onChange={this.handleChange} />Completed
            <br />
            <input type="submit" value="Save" />
            <button type="button" onClick={closeEditTaskPopup}>Close</button>
            <button type="button" onClick={this.handleDelete}>Delete</button>
          </form>
        </div>
      </div>
    );
  }
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
