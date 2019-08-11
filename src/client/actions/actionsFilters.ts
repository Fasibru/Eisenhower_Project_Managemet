import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  // GetFiltersFailureAction,
  // GetFiltersRequestAction,
  // GetFiltersSuccessAction,
  // ResetFiltersStoreAction,
  // UpdateFiltersAction,
  FiltersActionsTypes
} from '../../types/filterActionTypes';
import { Filter, Filters } from '../../types/storeTypes';
import {
  GET_FILTERS_FAILURE,
  GET_FILTERS_REQUEST,
  GET_FILTERS_SUCCESS,
  RESET_FILTERS_STORE,
  UPDATE_FILTERS,
} from '../constants/actionConstantsFilters';

export const getFiltersRequest = (): FiltersActionsTypes => ({
  type: GET_FILTERS_REQUEST,
});

export const getFiltersSuccess = (filters: Filter): FiltersActionsTypes => ({
  filters,
  type: GET_FILTERS_SUCCESS,
});

export const getFiltersFailure = (error: AxiosError): FiltersActionsTypes => ({
  type: GET_FILTERS_FAILURE,
  error,
});

export const getFilters = (): ThunkAction<
  void, // The return type of the thunk's inner function
  Filters, // The redux state
  // Optional extra argument passed to the inner function (if specified when setting up the Thunk middleware):
  null,
  // The (non-thunk) actions that can be dispatched:
  FiltersActionsTypes
> => (dispatch: Dispatch) => {
  dispatch(getFiltersRequest());
  axios.get('/api/filters')
    .then((res: AxiosResponse) => {
      dispatch(getFiltersSuccess(res.data[0]));
    })
    .catch((error: AxiosError) => {
      dispatch(getFiltersFailure(error));
    });
};

export const getUserFilters = (userId: string): ThunkAction<
  void,
  Filters,
  null,
  FiltersActionsTypes
> => (dispatch: Dispatch) => {
  dispatch(getFiltersRequest());
  axios.get(`/api/filters/${userId}`)
    .then((res: AxiosResponse) => {
      dispatch(getFiltersSuccess(res.data[0]));
    })
    .catch((error) => {
      dispatch(getFiltersFailure(error));
    });
};

export const updateFilters =
  (name: string, value: boolean | Date | string): FiltersActionsTypes => ({
    type: UPDATE_FILTERS,
    name,
    value,
  });

export const resetFiltersStore = (): FiltersActionsTypes => ({
  type: RESET_FILTERS_STORE,
});
