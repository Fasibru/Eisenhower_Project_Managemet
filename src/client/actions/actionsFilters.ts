import axios, { AxiosError, AxiosResponse } from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  GetFiltersFailureAction,
  GetFiltersRequestAction,
  GetFiltersSuccessAction,
  ResetFiltersStoreAction,
  UpdateFiltersAction,
} from '../../types/actionTypes';
import { Filter, Filters } from '../../types/storeTypes';
import {
  GET_FILTERS_FAILURE,
  GET_FILTERS_REQUEST,
  GET_FILTERS_SUCCESS,
  RESET_FILTERS_STORE,
  UPDATE_FILTERS,
} from '../constants/actionTypesFilters';

export const getFiltersRequest = (): GetFiltersRequestAction => ({
  type: GET_FILTERS_REQUEST,
});

export const getFiltersSuccess = (filters: Filter): GetFiltersSuccessAction => ({
  filters,
  type: GET_FILTERS_SUCCESS,
});

export const getFiltersFailure = (error: AxiosError): GetFiltersFailureAction => ({
  type: GET_FILTERS_FAILURE,
  error,
});

export const getFilters = (): ThunkAction<
  void, // The return type of the thunk's inner function
  Filters, // The redux state
  // Optional extra argument passed to the inner function (if specified when setting up the Thunk middleware):
  null,
  // The (non-thunk) actions that can be dispatched:
  GetFiltersRequestAction | GetFiltersSuccessAction | GetFiltersFailureAction
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
  GetFiltersRequestAction | GetFiltersSuccessAction | GetFiltersFailureAction
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
(name: string, value: boolean | Date | string): UpdateFiltersAction => ({
  type: UPDATE_FILTERS,
  name,
  value,
});

export const resetFiltersStore = (): ResetFiltersStoreAction => ({
  type: RESET_FILTERS_STORE,
});
