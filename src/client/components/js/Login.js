import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import { getUserId } from '../../actions/actionsUser';

const mapStateToProps = state => ({
  userId: state.user.userId,
});

// eslint-disable-next-line no-shadow
const Login = ({ userId, getUserId }) => {
  useEffect(() => {
    getUserId();
  });

  // Refactor with Redux
  const onSubmit = (event) => {
    event.preventDefault();
    const emailAddress = document.getElementById('emailAddress').value;
    const password = document.getElementById('password').value;
    axios.post('/account/login', { emailAddress, password }, { withCredentials: true })
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
              <input type="email" name="emailAddress" id="emailAddress" placeholder="email" required />
              <input type="password" name="password" id="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
            <Link to="/register">Register</Link>
          </div>
        )
      }
    </div>
  );
};

Login.propTypes = {
  userId: PropTypes.string.isRequired,
  getUserId: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  getUserId,
})(Login);
