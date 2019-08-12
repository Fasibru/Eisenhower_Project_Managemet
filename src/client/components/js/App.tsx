// tslint:disable-next-line: import-name
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ThunkAction } from 'redux-thunk';

import { getUserFilters } from '../../actions/actionsFilters';
import { getUserTasks } from '../../actions/actionsTasks';
import { getUser } from '../../actions/actionsUser';

import { FiltersActionsTypes } from '../../../types/filterActionTypes';
import { Filters, Store, TaskType, UserType } from '../../../types/storeTypes';
import { TaskActionsTypes } from '../../../types/taskActionTypes';
import { UserActionsTypes } from '../../../types/userActionTypes';

import MainContainer from '../../containers/Main.container';
import EditTask from './EditTask';
import Footer from './Footer';
import Header from './Header';
import LoadingScreen from './LoadingScreen';
import MenuBar from './MenuBar';
import NewTask from './NewTask';
import Sidenav from './Sidenav';

import '../scss/App.scss';

interface AppProps {
  newTaskPopup: boolean;
  editTaskPopup: boolean;
  userId: string;
  userError: string;
  isFetchingTasks: boolean;
  isFetchingUser: boolean;
  isFetchingFilters: boolean;
  getUserTasks(userId: string): ThunkAction<
    void,
    TaskType[],
    null,
    TaskActionsTypes
  >;
  getUserFilters(userId: string): ThunkAction<
    void,
    Filters,
    null,
    FiltersActionsTypes
  >;
  getUser(): ThunkAction<
    void,
    UserType,
    null,
    UserActionsTypes
  >;
}

const mapStateToProps = (state: Store) => ({
  editTaskPopup: state.tasks.editTaskPopup,
  isFetchingFilters: state.filters.isFetchingFilters,
  isFetchingTasks: state.tasks.isFetchingTasks,
  isFetchingUser: state.user.isFetchingUser,
  newTaskPopup: state.tasks.newTaskPopup,
  userError: state.user.userError,
  userId: state.user.userId,
});

// tslint:disable-next-line: variable-name
export const App: React.FC<AppProps> = ({
  // tslint:disable: no-shadowed-variable
  getUserTasks,
  getUserFilters,
  getUser,
  newTaskPopup,
  editTaskPopup,
  userId,
  userError,
  isFetchingTasks,
  isFetchingUser,
  isFetchingFilters,
  // tslint:enable: no-shadowed-variable
}) => {
  const [isInitialRender, setInitialRender] = useState(true);
  const [filtersMenuOpen, setFiltersMenuFlag] = useState(false);

  // guide on fetching data with useEffect:
  // https://www.robinwieruch.de/react-hooks-fetch-data/
  useEffect(() => {
    const fetchData = async () => {
      await getUser();
      if (userError) {
        history.pushState(null, null, '/');
        history.go();
      }
    };
    fetchData();
  },
  [userError]);

  useEffect(() => {
    if (userId) {
      getUserTasks(userId);
      getUserFilters(userId);
    }
    setInitialRender(false);
  },
  [userId]);

  if (isFetchingUser || isFetchingTasks || isFetchingFilters || isInitialRender) {
    return (
      <LoadingScreen />
    );
  }

  const toggleFilterMenu = () => {
    setFiltersMenuFlag(!filtersMenuOpen);
  };

  return (
    <div className="grid-container">
      <button
        type="button"
        id="sidenav__menu-icon"
        className="sidenav__menu-icon"
        // className={filtersMenuOpen ? 'sidenav__menu-icon' : 'sidenav__menu-icon sidenav--active'}
        onClick={toggleFilterMenu}
        onMouseDown={e => e.preventDefault()} /* to remove focus after button is clicked */
      >
        <MenuBar />
      </button>
      <Header />
      <Sidenav isOpen={filtersMenuOpen} toggleFilterMenu={toggleFilterMenu} />
      <MainContainer />
      <Footer />
      {newTaskPopup
        && (
          <NewTask />
        )
      }
      {editTaskPopup
        && (
          <EditTask />
        )
      }
    </div>
  );
};

// App.propTypes = {
//   getUserTasks: PropTypes.func.isRequired,
//   getUserFilters: PropTypes.func.isRequired,
//   getUser: PropTypes.func.isRequired,
//   newTaskPopup: PropTypes.bool.isRequired,
//   editTaskPopup: PropTypes.bool.isRequired,
//   userId: PropTypes.string.isRequired,
//   userError: PropTypes.string.isRequired,
//   isFetchingTasks: PropTypes.bool.isRequired,
//   isFetchingUser: PropTypes.bool.isRequired,
//   isFetchingFilters: PropTypes.bool.isRequired,
// };

export default connect(mapStateToProps, {
  getUser,
  getUserFilters,
  getUserTasks,
})(App);
