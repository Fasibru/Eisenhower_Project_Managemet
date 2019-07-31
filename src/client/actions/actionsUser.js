import axios from 'axios';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  REMOVE_USER,
  GET_LOGIN_REGISTER_ERROR,
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
    .catch((err) => {
      dispatch(getUserFailure(err));
    });
};

export const removeUser = () => ({
  type: REMOVE_USER,
});

export const getLoginRegisterError = message => ({
  type: GET_LOGIN_REGISTER_ERROR,
  message,
});
