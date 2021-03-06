import { FiltersActionsTypes } from '../../types/filterActionTypes';
import { Filters } from '../../types/storeTypes';
import {
  GET_FILTERS_FAILURE,
  GET_FILTERS_REQUEST,
  GET_FILTERS_SUCCESS,
  RESET_FILTERS_STORE,
  UPDATE_FILTERS,
  STORE_SEARCH_QUERY_INPUT,
} from '../constants/actionConstantsFilters';

const initialState = {
  filters: {
    showTasks: 'all',
    dateRangeStart: new Date().toISOString(),
    dateRangeEnd: new Date().toISOString(),
    dateRangeEndDefaultToday: false,
    searchQuery: '',
  },
  isFetchingFilters: false,
  fetchingError: '',
};

const filtersReducer = (state = initialState, action: FiltersActionsTypes): Filters => {
  switch (action.type) {
    case GET_FILTERS_REQUEST:
      return Object.assign({}, state, {
        isFetchingFilters: true,
      });
    case GET_FILTERS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingFilters: false,
        filters: {
          ...state.filters,
          ...action.filters,
        }
      });
    case GET_FILTERS_FAILURE:
      return Object.assign({}, state, {
        fetchingError: action.error.message,
        isFetchingFilters: false,
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
    case STORE_SEARCH_QUERY_INPUT:
      return Object.assign({}, state, {
        filters: {
          ...state.filters,
          searchQuery: action.value,
        },
      });
    default:
      return state;
  }
};

export default filtersReducer;
