import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import '../scss/Home.scss';

import Login from './Login';
import Register from './Register';

import { resetFiltersStore } from '../../actions/actionsFilters';
import { resetTasksStore } from '../../actions/actionsTasks';
import {
  getUser,
  removeUser,
} from '../../actions/actionsUser';

import { FiltersActionsTypes } from '../../../types/filterActionTypes';
import { Store } from '../../../types/storeTypes';
import { TaskActionsTypes } from '../../../types/taskActionTypes';
import { UserActionsTypes } from '../../../types/userActionTypes';

interface HomeProps {
  userId: string;
  getUser(): UserActionsTypes;
  removeUser(): UserActionsTypes;
  resetFiltersStore(): FiltersActionsTypes;
  resetTasksStore(): TaskActionsTypes;
}

const mapStateToProps = (state: Store) => ({
  userId: state.user.userId,
});

const Home: React.FC<HomeProps> = ({
  // tslint:disable: no-shadowed-variable
  getUser,
  removeUser,
  resetFiltersStore,
  resetTasksStore,
  userId,
  // tslint:enable: no-shadowed-variable
}) => {
  useEffect(() => {
    getUser();
  },
  []);

  const [registerFlag, setRegisterFlag] = useState(false);

  const logout = () => {
    removeUser();
    axios.post('/account/logout')
      .then(() => {
        resetFiltersStore();
        resetTasksStore();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="home">
      <div className="home__header">
        <header className="container-content container-content-header">
          <div className="home__title">
            <h1>JATLA</h1>
            <h2>Project Management</h2>
          </div>
          {!userId
            && (
              <div className="home__access">
                {
                  registerFlag
                    ? (
                      <div className="home__access--center">
                        <Register />
                        <span>Already have an account?</span>
                        <button
                          className="home__access-btn"
                          type="button"
                          onClick={() => setRegisterFlag(false)}
                          onMouseDown={e => e.preventDefault()} // remove focus after click
                        >
                          Login
                        </button>
                      </div>
                    )
                    : (
                      <div className="home__access--center">
                        <Login />
                        <span>Want to create a new account?</span>
                        <button
                          className="home__access-btn"
                          type="button"
                          onClick={() => setRegisterFlag(true)}
                          onMouseDown={e => e.preventDefault()} // remove focus after click
                        >
                          Register
                        </button>
                      </div>
                    )
                }
              </div>
            )
          }
          {userId
            && (
              <div className="home_app">
                <Link to="/app">App</Link>
                <button type="button" onClick={logout}>Logout</button>
              </div>
            )
          }
        </header>
      </div>
      <div className="home__description">
        <main className="container-content">
          <p>A description with a slideshow of screenshots and an outlook will follow here.</p>
          <p>Some information about the why and who will follow too.</p>
          <p>
            You can use the following demo login.
            Not connected to backend and some functions disabled
            since I want to avoid having to store any kind of personal data.
            Hence registering is also disabled.</p>
          <p>
            The app is still a prototype and as such it works
            but there are still many improvements planned
            - frontend and backend wise.
          </p>
        </main>
      </div>
    </div>
  );
};

// Home.propTypes = {
//   getUser: PropTypes.func.isRequired,
//   removeUser: PropTypes.func.isRequired,
//   resetFiltersStore: PropTypes.func.isRequired,
//   resetTasksStore: PropTypes.func.isRequired,
//   userId: PropTypes.string.isRequired,
// };

export default connect(mapStateToProps, {
  getUser,
  removeUser,
  resetFiltersStore,
  resetTasksStore,
})(Home);
