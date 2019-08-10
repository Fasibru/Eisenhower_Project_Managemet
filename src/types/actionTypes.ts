import { AxiosError } from 'axios';
import {
  GET_FILTERS_FAILURE,
  GET_FILTERS_REQUEST,
  GET_FILTERS_SUCCESS,
  RESET_FILTERS_STORE,
  UPDATE_FILTERS,
} from '../client/constants/actionTypesFilters';

import {
  Filter,
} from './storeTypes';

export interface GetFiltersRequestAction {
  type: typeof GET_FILTERS_REQUEST;
}

export interface GetFiltersSuccessAction {
  type: typeof GET_FILTERS_SUCCESS;
  filters: Filter;
}

export interface GetFiltersFailureAction {
  type: typeof GET_FILTERS_FAILURE;
  error: AxiosError;
}

export interface ResetFiltersStoreAction {
  type: typeof RESET_FILTERS_STORE;
}

export interface UpdateFiltersAction {
  type: typeof UPDATE_FILTERS;
  name: string;
  value: boolean | Date | string;
}
