import {
  GET_FILTERS,
  UPDATE_FILTERS,
  RESET_FILTERS_STORE,
} from '../constants/actionTypesFilters';


const initialState = {
  filters: {
    showTasks: 'all',
    dateRangeStart: new Date().toISOString(),
    dateRangeEnd: new Date().toISOString(),
    // userID: '',
  },
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FILTERS:
      return Object.assign({}, state, {
        filters: action.filters,
      });
    case UPDATE_FILTERS:
      return Object.assign({}, state, {
        filters: {
          ...state.filters,
          [action.name]: action.value,
        },
      });
    case RESET_FILTERS_STORE:
      return Object.assign({}, initialState);
    default:
      return state;
  }
};

export default filtersReducer;
