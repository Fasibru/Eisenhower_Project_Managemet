import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { User } from '../../types/storeTypes';
import { AxiosResponseUser, UserActionsTypes } from '../../types/userActionTypes';
import {
  GET_LOGIN_ERROR,
  GET_REGISTER_ERROR,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  REMOVE_USER,
  RESET_LOGIN_ERROR,
  RESET_REGISTER_ERROR,
  SET_USER_INFORMATION,
} from '../constants/actionConstantsUser';

export const getUserRequest = (): UserActionsTypes => ({
  type: GET_USER_REQUEST,
});

export const getUserSuccess = (user: AxiosResponseUser): UserActionsTypes => ({
  type: GET_USER_SUCCESS,
  user,
});

export const getUserFailure = (error: AxiosError): UserActionsTypes => ({
  type: GET_USER_FAILURE,
  error,
});

export const getUser = (): ThunkAction<
  void,
  User,
  null,
  UserActionsTypes
> => (dispatch: Dispatch) => {
  dispatch(getUserRequest());
  return axios.get('/account/user')
    .then((res: AxiosResponse) => {
      dispatch(getUserSuccess(res.data));
    })
    .catch((error: AxiosError) => {
      dispatch(getUserFailure(error));
    });
};

export const removeUser = (): UserActionsTypes => ({
  type: REMOVE_USER,
});

export const getLoginError = (message: string): UserActionsTypes => ({
  type: GET_LOGIN_ERROR,
  message,
});

export const resetLoginError = (): UserActionsTypes => ({
  type: RESET_LOGIN_ERROR,
});

export const getRegisterError = (message: string): UserActionsTypes => ({
  type: GET_REGISTER_ERROR,
  message,
});

export const resetRegisterError = (): UserActionsTypes => ({
  type: RESET_REGISTER_ERROR,
});

export const setUserInformation = (user: User): UserActionsTypes => ({
  type: SET_USER_INFORMATION,
  user,
});
