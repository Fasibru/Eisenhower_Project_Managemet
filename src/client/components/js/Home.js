// import React, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

import {
  getUser,
  removeUser,
} from '../../actions/actionsUser';
import { resetTasksStore } from '../../actions/actionsTasks';
import { resetFiltersStore } from '../../actions/actionsFilters';

const mapStateToProps = state => ({
  userId: state.user.userId,
});

class Home extends Component {
  componentDidMount = () => {
    // eslint-disable-next-line no-shadow
    const { getUser } = this.props;
    getUser();
  }

  logout = () => {
    // eslint-disable-next-line no-shadow
    const { removeUser, resetFiltersStore, resetTasksStore } = this.props;
    removeUser();
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
  getUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  resetFiltersStore: PropTypes.func.isRequired,
  resetTasksStore: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {
  getUser,
  removeUser,
  resetFiltersStore,
  resetTasksStore,
})(Home);
