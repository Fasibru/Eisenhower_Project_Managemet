import { FiltersActionsTypes } from '../../types/filterActionTypes';
import { Filters } from '../../types/storeTypes';
import {
  GET_FILTERS_FAILURE,
  GET_FILTERS_REQUEST,
  GET_FILTERS_SUCCESS,
  RESET_FILTERS_STORE,
  UPDATE_FILTERS,
} from '../constants/actionConstantsFilters';


const initialState = {
  filters: {
    showTasks: 'all',
    dateRangeStart: new Date().toISOString(),
    dateRangeEnd: new Date().toISOString(),
    dateRangeEndDefaultToday: false,
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
        filters: action.filters,
      });
    case GET_FILTERS_FAILURE:
      return Object.assign({}, state, {
        isFetchingFilters: false,
        fetchingError: action.error.message,
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
