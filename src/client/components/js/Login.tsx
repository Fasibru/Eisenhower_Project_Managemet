import axios from 'axios';
// tslint:disable-next-line: import-name
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';

import {
  getLoginError,
  getUser,
  resetLoginError,
  resetRegisterError,
} from '../../actions/actionsUser';

import { Store } from '../../../types/storeTypes';
import { UserActionsTypes } from '../../../types/userActionTypes';

interface LoginProps {
  loginError: string;
  userId: string;
  getUser(): UserActionsTypes;
  getLoginError(message: string): UserActionsTypes;
  resetRegisterError(): UserActionsTypes;
  resetLoginError(): UserActionsTypes;
}

const mapStateToProps = (state: Store) => ({
  loginError: state.user.loginError,
  userId: state.user.userId,
});

const Login: React.FC<LoginProps> = ({
  userId,
  // tslint:disable: no-shadowed-variable
  getUser,
  getLoginError,
  resetLoginError,
  resetRegisterError,
  loginError,
  // tslint:enable: no-shadowed-variable
}) => {
  useEffect(() => {
    getUser();
    resetRegisterError();
  }, []);

  const textInputEmailAddress = React.createRef<HTMLInputElement>();
  const textInputPassword = React.createRef<HTMLInputElement>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailAddress = textInputEmailAddress.current.value;
    const password = textInputPassword.current.value;
    axios.post('/account/login', { emailAddress, password })
      .then(() => {
        history.pushState(null, null, '/app');
        history.go();
      })
      .catch((err) => {
        getLoginError(err.response.data.message);
        // console.log(err);
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
                ref={textInputEmailAddress}
                placeholder="email"
                onChange={resetLoginError}
                required={true}
              />
              <input
                type="password"
                name="password"
                id="password"
                ref={textInputPassword}
                placeholder="Password"
                onChange={resetLoginError}
                required={true}
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

// Login.propTypes = {
//   userId: PropTypes.string.isRequired,
//   getUser: PropTypes.func.isRequired,
//   getLoginError: PropTypes.func.isRequired,
//   resetLoginError: PropTypes.func.isRequired,
//   loginError: PropTypes.string.isRequired,
//   resetRegisterError: PropTypes.func.isRequired,
// };

export default connect(mapStateToProps, {
  getLoginError,
  getUser,
  resetLoginError,
  resetRegisterError,
})(Login);
