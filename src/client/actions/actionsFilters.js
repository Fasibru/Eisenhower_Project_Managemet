import axios from 'axios';
import {
  GET_FILTERS,
  UPDATE_FILTERS,
  RESET_FILTERS_STORE,
} from '../constants/actionTypesFilters';

export const getFilters = () => (dispatch) => {
  axios.get('/api/filters')
    .then((res) => {
      dispatch({
        type: GET_FILTERS,
        filters: res.data[0],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserFilters = userId => (dispatch) => {
  axios.get(`/api/filters/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_FILTERS,
        filters: res.data[0],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateFilters = (name, value) => ({
  type: UPDATE_FILTERS,
  name,
  value,
});

export const resetFiltersStore = () => ({
  type: RESET_FILTERS_STORE,
});
