import React from 'react';
// import PropTypes from 'prop-types';
import '../css/EditTask.css';
import PropTypes from 'prop-types';

function EditTask(props) {
  const { editTask } = props;
  return (
    <div className="editTask-outer">
      <div className="editTask-inner">
        <p>{editTask._id}</p>
        <p>{editTask.rank}</p>
        <p>{editTask.category}</p>
        <p>{editTask.title}</p>
        <p>{editTask.description}</p>
      </div>
    </div>
  );
}

EditTask.propTypes = {
  editTask: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditTask;
