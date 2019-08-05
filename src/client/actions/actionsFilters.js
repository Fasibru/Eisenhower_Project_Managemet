import axios from 'axios';
import {
  GET_FILTERS_FAILURE,
  GET_FILTERS_SUCCESS,
  GET_FILTERS_REQUEST,
  UPDATE_FILTERS,
  RESET_FILTERS_STORE,
} from '../constants/actionTypesFilters';

export const getFiltersRequest = () => ({
  type: GET_FILTERS_REQUEST,
});

export const getFiltersSuccess = filters => ({
  type: GET_FILTERS_SUCCESS,
  filters,
});

export const getFiltersFailure = error => ({
  type: GET_FILTERS_FAILURE,
  error,
});

export const getFilters = () => (dispatch) => {
  dispatch(getFiltersRequest());
  axios.get('/api/filters')
    .then((res) => {
      dispatch(getFiltersSuccess(res.data[0]));
    })
    .catch((error) => {
      dispatch(getFiltersFailure(error));
    });
};

export const getUserFilters = userId => (dispatch) => {
  dispatch(getFiltersRequest());
  axios.get(`/api/filters/${userId}`)
    .then((res) => {
      dispatch(getFiltersSuccess(res.data[0]));
    })
    .catch((error) => {
      dispatch(getFiltersFailure(error));
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
