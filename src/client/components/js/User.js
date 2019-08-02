/* eslint-disable no-alert */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import '../scss/User.scss';
import MenuBar from './MenuBar';
import { removeUser } from '../../actions/actionsUser';
import { resetTasksStore } from '../../actions/actionsTasks';
import { resetFiltersStore } from '../../actions/actionsFilters';

const mapStateToProps = state => ({
  emailAddress: state.user.emailAddress,
});

const User = ({
  /* eslint-disable no-shadow */
  emailAddress,
  removeUser,
  resetFiltersStore,
  resetTasksStore,
  /* eslint-enable no-shadow */
}) => {
  const [userDialog, setUserDialog] = useState(false);

  const deleteAccount = () => {
    if (confirm('If you proceed all your data will be deleted and cannot be restored. Do you really want to delete your account?')) {
      axios.delete('/account/user')
        .then(() => {
          removeUser();
        })
        .catch(err => console.log(err));
    }
  };

  const logoutUser = () => {
    removeUser();
    axios.post('/account/logout')
      .then(() => {
        resetFiltersStore();
        resetTasksStore();
        history.pushState(null, null, '/home');
        history.go();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="user__container">
      {!userDialog
        && (
          <button
            type="button"
            className="user-dialog__btn"
            onClick={() => setUserDialog(!userDialog)}
          >
            <MenuBar />
          </button>
        )
      }
      {userDialog
        && (
          <div className="user-dialog__container">
            <button
              type="button"
              className="user-dialog__btn--open"
              onClick={() => setUserDialog(!userDialog)}
            >
              <span>{emailAddress}</span>
              <MenuBar />
            </button>
            <button
              type="button"
              className="user-dialog__item user-dialog__menu-btn"
              onClick={() => alert('Functionality not implemented yet')}
              onMouseDown={e => e.preventDefault()} /* to remove focus after button is clicked */
            >
              Change Password
            </button>
            <button
              type="button"
              className="user-dialog__item user-dialog__menu-btn"
              onClick={deleteAccount}
              onMouseDown={e => e.preventDefault()} /* to remove focus after button is clicked */
            >
              Delete Account
            </button>
            <button
              type="button"
              className="user-dialog__item user-dialog__menu-btn"
              onClick={logoutUser}
              onMouseDown={e => e.preventDefault()} /* to remove focus after button is clicked */
            >
              Logout
            </button>
            {/* <p className="user-dialog__item">Logout</p> */}
          </div>
        )
      }
    </div>
  );
};

User.propTypes = {
  emailAddress: PropTypes.string.isRequired,
  removeUser: PropTypes.func.isRequired,
  resetFiltersStore: PropTypes.func.isRequired,
  resetTasksStore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  removeUser,
  resetFiltersStore,
  resetTasksStore,
})(User);
