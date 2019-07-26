import axios from 'axios';
import {
  GET_USER_ID_REQUEST,
  GET_USER_ID_SUCCESS,
  GET_USER_ID_FAILURE,
} from '../constants/actionTypesUser';

export const getUserIdRequest = () => ({
  type: GET_USER_ID_REQUEST,
});

export const getUserIdSuccess = userId => ({
  type: GET_USER_ID_SUCCESS,
  userId,
});

export const getUserIdFailure = error => ({
  type: GET_USER_ID_FAILURE,
  error,
});

export const getUserId = () => (dispatch) => {
  dispatch(getUserIdRequest());
  axios.get('/account/login')
    .then((res) => {
      dispatch(getUserIdSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getUserIdFailure(err));
    });
};
