import { User } from '../../types/storeTypes';
import { UserActionsTypes } from '../../types/userActionTypes';
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

const initialState = {
  userId: '',
  isFetchingUser: false,
  userError: '',
  emailAddress: '',
  firstName: '',
  lastName: '',
  loginRegisterError: '',
  loginError: '',
  registerError: '',
};

const userReducer = (state = initialState, action: UserActionsTypes): User => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return Object.assign({}, state, {
        isFetchingUser: true,
      });
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {
        userId: action.user._id,
        isFetchingUser: false,
        emailAddress: action.user.emailAddress,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
      });
    case GET_USER_FAILURE:
      return Object.assign({}, state, {
        isFetchingUser: false,
        userError: action.error.message,
      });
    case REMOVE_USER:
      return Object.assign({}, initialState);
    case GET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.message,
      });
    case RESET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: initialState.loginError,
      });
    case GET_REGISTER_ERROR:
      return Object.assign({}, state, {
        registerError: action.message,
      });
    case RESET_REGISTER_ERROR:
      return Object.assign({}, state, {
        registerError: initialState.registerError,
      });
    case SET_USER_INFORMATION:
      return Object.assign({}, state, {
        emailAddress: action.user.emailAddress,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        userId: action.user.userId,
      });
    default:
      return state;
  }
};

export default userReducer;
