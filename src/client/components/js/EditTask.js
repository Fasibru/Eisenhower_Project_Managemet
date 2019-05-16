import React from 'react';
// import PropTypes from 'prop-types';
import '../css/EditTask.css';
import PropTypes from 'prop-types';

/*
ToDos:
  - checkbox for completed
*/

function EditTask(props) {
  const {
    toggleEditTaskPopup,
    editTask,
    submitEditTask,
    handleDeleteTask,
  } = props;

  const handleChange = (event) => {
    /*
    If this function only calls the function from props then it's redundant.
    But I want to keep it for now for later validation purposes */
    const { defineEditTask } = props;
    defineEditTask(event);
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
        <form onSubmit={submitEditTask}>
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
          <button type="button" onClick={toggleEditTaskPopup}>Close</button>
          <button type="button" onClick={handleDeleteTask}>Delete</button>
        </form>
      </div>
    </div>
  );
}

EditTask.propTypes = {
  toggleEditTaskPopup: PropTypes.func.isRequired,
  editTask: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  defineEditTask: PropTypes.func.isRequired,
  submitEditTask: PropTypes.func.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
};

export default EditTask;
