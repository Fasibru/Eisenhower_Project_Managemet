import {
  GET_FILTERS,
  UPDATE_FILTERS,
} from '../constants/action-types';


const initialState = {
  filters: {
    showTasks: 'both',
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
    default:
      return state;
  }
};

export default filtersReducer;
