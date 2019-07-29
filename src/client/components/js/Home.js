// import React, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

import {
  getUserId,
  removeUserId,
} from '../../actions/actionsUser';
import { resetTasksStore } from '../../actions/actionsTasks';
import { resetFiltersStore } from '../../actions/actionsFilters';

const mapStateToProps = state => ({
  userId: state.user.userId,
  isFetchingUserId: state.user.isFetchingUserId,
  userIdError: state.user.userIdError,
});

class Home extends Component {
  componentDidMount = () => {
    // eslint-disable-next-line no-shadow
    const { getUserId } = this.props;
    getUserId();
  }

  logout = () => {
    // eslint-disable-next-line no-shadow
    const { removeUserId, resetFiltersStore, resetTasksStore } = this.props;
    removeUserId();
    axios.post('/account/logout')
      .then(() => {
        resetFiltersStore();
        resetTasksStore();
      })
      .catch(err => console.log(err));
  }

  render() {
    const { userId } = this.props;

    return (
      <div>
        {!userId
          && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )
        }
        {userId
          && (
            <div>
              <Link to="/app">App</Link>
              <button type="button" onClick={this.logout}>Logout</button>
            </div>
          )
        }
      </div>
    );
  }
}

Home.propTypes = {
  getUserId: PropTypes.func.isRequired,
  removeUserId: PropTypes.func.isRequired,
  resetFiltersStore: PropTypes.func.isRequired,
  resetTasksStore: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {
  getUserId,
  removeUserId,
  resetFiltersStore,
  resetTasksStore,
})(Home);
