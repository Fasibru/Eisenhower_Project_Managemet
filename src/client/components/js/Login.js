import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import {
  getUser,
  getLoginRegisterError,
  setUserInformation,
} from '../../actions/actionsUser';

const mapStateToProps = state => ({
  userId: state.user.userId,
  loginRegisterError: state.user.loginRegisterError,
});

const Login = ({
  userId,
  /* eslint-disable no-shadow */
  getUser,
  getLoginRegisterError,
  loginRegisterError,
  setUserInformation,
  /* eslint-enable no-shadow */
}) => {
  useEffect(() => {
    getUser();
  });

  // Refactor with Redux
  const onSubmit = (event) => {
    event.preventDefault();
    const emailAddress = document.getElementById('emailAddress').value;
    const password = document.getElementById('password').value;
    axios.post('/account/login', { emailAddress, password }, { withCredentials: true })
      .then((res) => {
        setUserInformation(res.data);
        // pass userId to App so it's available before first render
        history.pushState({ userId: res.data.userId }, null, '/app');
        history.go();
      })
      .catch((err) => {
        getLoginRegisterError(err.response.data.message);
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
          <div>
            {loginRegisterError
              && (
                <p>{loginRegisterError}</p>
              )
            }
            <form onSubmit={onSubmit}>
              <input type="email" name="emailAddress" id="emailAddress" placeholder="email" required />
              <input type="password" name="password" id="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
            {/* <Link to="/register">Register</Link> */}
          </div>
        )
      }
    </div>
  );
};

Login.propTypes = {
  userId: PropTypes.string.isRequired,
  getUser: PropTypes.func.isRequired,
  getLoginRegisterError: PropTypes.func.isRequired,
  setUserInformation: PropTypes.func.isRequired,
  loginRegisterError: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {
  getUser,
  getLoginRegisterError,
  setUserInformation,
})(Login);
