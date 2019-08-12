import { AxiosError, AxiosResponse } from 'axios';
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
} from '../client/constants/actionConstantsUser';

import { UserType } from './storeTypes';

export interface AxiosResponseUser {
  _id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

interface GetLoginErrorAction {
  type: typeof GET_LOGIN_ERROR;
  message: string;
}

interface GetRegisterErrorAction {
  type: typeof GET_REGISTER_ERROR;
  message: string;
}

interface GetUserFailureAction {
  type: typeof GET_USER_FAILURE;
  error: AxiosError;
}

interface GetUserRequestAction {
  type: typeof GET_USER_REQUEST;
}

interface GetUserSuccessAction {
  type: typeof GET_USER_SUCCESS;
  user: AxiosResponseUser;
}

interface RemoveUserAction {
  type: typeof REMOVE_USER;
}

interface ResetLoginErrorAction {
  type: typeof RESET_LOGIN_ERROR;
}

interface ResetRegisterErrorAction {
  type: typeof RESET_REGISTER_ERROR;
}

interface SetUserInformationAction {
  type: typeof SET_USER_INFORMATION;
  user: UserType;
}

export type UserActionsTypes =
GetLoginErrorAction |
GetRegisterErrorAction |
GetUserFailureAction |
GetUserRequestAction |
GetUserSuccessAction |
RemoveUserAction |
ResetLoginErrorAction |
ResetRegisterErrorAction |
SetUserInformationAction;
