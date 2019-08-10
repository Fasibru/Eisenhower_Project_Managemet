import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import {
  getUser,
  getLoginError,
  resetLoginError,
  resetRegisterError,
} from '../../actions/actionsUser';

const mapStateToProps = state => ({
  userId: state.user.userId,
  loginError: state.user.loginError,
});

const Login = ({
  userId,
  /* eslint-disable no-shadow */
  getUser,
  getLoginError,
  resetLoginError,
  resetRegisterError,
  loginError,
  /* eslint-enable no-shadow */
}) => {
  useEffect(() => {
    getUser();
    resetRegisterError();
  },
  []);

  // TODO: Work with refs instead of directly interacting with the DOM
  const onSubmit = (event) => {
    event.preventDefault();
    const emailAddress = document.getElementById('emailAddress').value;
    const password = document.getElementById('password').value;
    axios.post('/account/login', { emailAddress, password })
      .then(() => {
        history.pushState(null, null, '/app');
        history.go();
      })
      .catch((err) => {
        getLoginError(err.response.data.message);
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
                type="email"
                name="emailAddress"
                id="emailAddress"
                placeholder="email"
                onChange={resetLoginError}
                required
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={resetLoginError}
                required
              />
              <button type="submit">Login</button>
            </form>
            {loginError
              && (
                <p className="access__login-register-error">{loginError}</p>
              )
            }
          </div>
        )
      }
    </div>
  );
};

Login.propTypes = {
  userId: PropTypes.string.isRequired,
  getUser: PropTypes.func.isRequired,
  getLoginError: PropTypes.func.isRequired,
  resetLoginError: PropTypes.func.isRequired,
  loginError: PropTypes.string.isRequired,
  resetRegisterError: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  getUser,
  getLoginError,
  resetLoginError,
  resetRegisterError,
})(Login);
