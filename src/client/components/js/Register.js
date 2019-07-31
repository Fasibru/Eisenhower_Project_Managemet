import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  getUser,
  getLoginRegisterError,
} from '../../actions/actionsUser';

const mapStateToProps = state => ({
  userId: state.user.userId,
  loginRegisterError: state.user.loginRegisterError,
});


// eslint-disable-next-line no-shadow
const Register = ({
  userId,
  /* eslint-disable no-shadow */
  getUser,
  getLoginRegisterError,
  loginRegisterError
  /* eslint-enable no-shadow */
}) => {
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
      .then(() => {
        history.pushState(null, null, '/app');
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
  userId: PropTypes.string.isRequired,
  getUser: PropTypes.func.isRequired,
  getLoginRegisterError: PropTypes.func.isRequired,
  loginRegisterError: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {
  getUser,
  getLoginRegisterError,
})(Register);
