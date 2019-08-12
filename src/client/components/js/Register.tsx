import axios from 'axios';
// tslint:disable-next-line: import-name
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';

import {
  getRegisterError,
  getUser,
  resetLoginError,
  resetRegisterError,
} from '../../actions/actionsUser';

import { Store } from '../../../types/storeTypes';
import { UserActionsTypes } from '../../../types/userActionTypes';

interface RegisterProps {
  registerError: string;
  userId: string;
  getUser(): UserActionsTypes;
  getRegisterError(message: string): UserActionsTypes;
  resetRegisterError(): UserActionsTypes;
  resetLoginError(): UserActionsTypes;
}

const mapStateToProps = (state: Store) => ({
  registerError: state.user.registerError,
  userId: state.user.userId,
});

// tslint:disable-next-line: variable-name
const Register: React.FC<RegisterProps> = ({
  userId,
  // tslint:disable: no-shadowed-variable
  getUser,
  getRegisterError,
  resetRegisterError,
  registerError,
  resetLoginError,
  // tslint:enable: no-shadowed-variable
}) => {
  useEffect(() => {
    getUser();
    resetLoginError();
  }, []);

  const textInputFirstName = React.createRef<HTMLInputElement>();
  const textInputLastName = React.createRef<HTMLInputElement>();
  const textInputEmailAddress = React.createRef<HTMLInputElement>();
  const textInputPassword = React.createRef<HTMLInputElement>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const firstName = textInputFirstName.current.value;
    const lastName = textInputLastName.current.value;
    const emailAddress = textInputEmailAddress.current.value;
    const password = textInputPassword.current.value;
    axios.post('/account/register', {
      emailAddress,
      firstName,
      lastName,
      password,
    })
      .then(() => {
        history.pushState(null, null, '/app');
        history.go();
      })
      .catch((err) => {
        getRegisterError(err.response.data.message);
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
                type="firstName"
                name="firstName"
                id="firstName"
                ref={textInputFirstName}
                placeholder="First Name"
                onChange={resetRegisterError}
                required={true}
              />
              <input
                type="lastName"
                name="lastName"
                id="lastName"
                ref={textInputLastName}
                placeholder="Last Name"
                onChange={resetRegisterError}
                required={true}
              />
              <input
                type="email"
                name="emailAddress"
                id="emailAddress"
                ref={textInputEmailAddress}
                placeholder="email"
                onChange={resetRegisterError}
                required={true}
              />
              <input
                type="password"
                name="password"
                id="password"
                ref={textInputPassword}
                placeholder="Password"
                onChange={resetRegisterError}
                required={true}
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

// Register.propTypes = {
//   userId: PropTypes.string.isRequired,
//   getUser: PropTypes.func.isRequired,
//   getRegisterError: PropTypes.func.isRequired,
//   resetRegisterError: PropTypes.func.isRequired,
//   registerError: PropTypes.string.isRequired,
//   resetLoginError: PropTypes.func.isRequired,
// };

export default connect(mapStateToProps, {
  getRegisterError,
  getUser,
  resetLoginError,
  resetRegisterError,
})(Register);
