import axios from 'axios';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  REMOVE_USER,
  GET_LOGIN_REGISTER_ERROR,
  GET_LOGIN_ERROR,
  RESET_LOGIN_ERROR,
  GET_REGISTER_ERROR,
  RESET_REGISTER_ERROR,
  SET_USER_INFORMATION,
} from '../constants/actionTypesUser';

export const getUserRequest = () => ({
  type: GET_USER_REQUEST,
});

export const getUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  user,
});

export const getUserFailure = error => ({
  type: GET_USER_FAILURE,
  error,
});

export const getUser = () => (dispatch) => {
  dispatch(getUserRequest());
  return axios.get('/account/user')
    .then((res) => {
      dispatch(getUserSuccess(res.data));
    })
    .catch((error) => {
      dispatch(getUserFailure(error));
    });
};

export const removeUser = () => ({
  type: REMOVE_USER,
});

export const getLoginRegisterError = message => ({
  type: GET_LOGIN_REGISTER_ERROR,
  message,
});

export const getLoginError = message => ({
  type: GET_LOGIN_ERROR,
  message,
});

export const resetLoginError = () => ({
  type: RESET_LOGIN_ERROR,
});

export const getRegisterError = message => ({
  type: GET_REGISTER_ERROR,
  message,
});

export const resetRegisterError = () => ({
  type: RESET_REGISTER_ERROR,
});

export const setUserInformation = user => ({
  type: SET_USER_INFORMATION,
  user,
});
