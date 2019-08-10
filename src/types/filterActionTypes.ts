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

interface GetFiltersRequestAction {
  type: typeof GET_FILTERS_REQUEST;
}

interface GetFiltersSuccessAction {
  type: typeof GET_FILTERS_SUCCESS;
  filters: Filter;
}

interface GetFiltersFailureAction {
  type: typeof GET_FILTERS_FAILURE;
  error: AxiosError;
}

interface ResetFiltersStoreAction {
  type: typeof RESET_FILTERS_STORE;
}

interface UpdateFiltersAction {
  type: typeof UPDATE_FILTERS;
  name: string;
  value: boolean | Date | string;
}

export type FiltersActionsTypes =
GetFiltersFailureAction |
GetFiltersRequestAction |
GetFiltersSuccessAction |
ResetFiltersStoreAction |
UpdateFiltersAction;
