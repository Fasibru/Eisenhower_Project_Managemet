import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { getUser } from '../../actions/actionsUser';

const mapStateToProps = state => ({
  filters: state.filters.filters,
  userId: state.user.userId,
});


// eslint-disable-next-line no-shadow
const Register = ({ filters, getUser, userId }) => {
  useEffect(() => {
    getUser();
  });

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
      {userId
        && (
          <Redirect to="/app" />
        )
      }
      {!userId
        && (
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
        )
      }
    </div>
  );
};

Register.propTypes = {
  filters: PropTypes.shape({
    showTasks: PropTypes.string,
    dateRangeStart: PropTypes.string,
    dateRangeEnd: PropTypes.string,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  getUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  getUser,
})(Register);
