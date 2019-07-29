import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => ({
  filters: state.filters.filters,
});


const Register = ({ filters }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const emailAddress = document.getElementById('emailAddress').value;
    const password = document.getElementById('password').value;
    axios.post('/account/register', {
      firstName,
      lastName,
      emailAddress,
      password,
    })
      .then((res) => {
        axios.post(`/api/filters/${res.data._id}`, {
          ...filters,
          userID: res.data._id,
        })
          .catch(err => console.log(err));
      })
      .then(() => {
        history.pushState(null, null, '/app');
        history.go();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="firstName" name="firstName" id="firstName" placeholder="First Name" required />
        <input type="lastName" name="lastName" id="lastName" placeholder="Last Name" required />
        <input type="email" name="emailAddress" id="emailAddress" placeholder="email" required />
        <input type="password" name="password" id="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
};

Register.propTypes = {
  filters: PropTypes.shape({
    showTasks: PropTypes.string,
    dateRangeStart: PropTypes.string,
    dateRangeEnd: PropTypes.string,
    // userID: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(Register);
