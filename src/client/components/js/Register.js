import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  getUser,
  getRegisterError,
  resetRegisterError,
  resetLoginError,
} from '../../actions/actionsUser';

const mapStateToProps = state => ({
  userId: state.user.userId,
  registerError: state.user.registerError,
});


// eslint-disable-next-line no-shadow
const Register = ({
  userId,
  /* eslint-disable no-shadow */
  getUser,
  getRegisterError,
  resetRegisterError,
  registerError,
  resetLoginError,
  /* eslint-enable no-shadow */
}) => {
  useEffect(() => {
    getUser();
    resetLoginError();
  },
  []);

  // TODO: Work with refs instead of directly interacting with the DOM
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
      .then(() => {
        history.pushState(null, null, '/app');
        history.go();
      })
      .catch((err) => {
        getRegisterError(err.response.data.message);
        console.log(err);
      });
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
          <div className="access">
            <form onSubmit={onSubmit}>
              <input
                type="firstName"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                onChange={resetRegisterError}
                required
              />
              <input
                type="lastName"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                onChange={resetRegisterError}
                required
              />
              <input
                type="email"
                name="emailAddress"
                id="emailAddress"
                placeholder="email"
                onChange={resetRegisterError}
                required
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={resetRegisterError}
                required
              />
              <button type="submit">Register</button>
            </form>
            {registerError
              && (
                <p className="access__login-register-error">{registerError}</p>
              )
            }
          </div>
        )
      }
    </div>
  );
};

Register.propTypes = {
  userId: PropTypes.string.isRequired,
  getUser: PropTypes.func.isRequired,
  getRegisterError: PropTypes.func.isRequired,
  resetRegisterError: PropTypes.func.isRequired,
  registerError: PropTypes.string.isRequired,
  resetLoginError: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  getUser,
  getRegisterError,
  resetRegisterError,
  resetLoginError,
})(Register);
