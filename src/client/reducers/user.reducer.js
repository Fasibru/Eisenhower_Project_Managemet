import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  REMOVE_USER,
  GET_LOGIN_REGISTER_ERROR,
  SET_USER_INFORMATION,
} from '../constants/actionTypesUser';

const initialState = {
  userId: '',
  isFetchingUser: false,
  userError: '',
  emailAddress: '',
  firstName: '',
  lastName: '',
  loginRegisterError: '',
};

const userReducer = (state = initialState, action) => {
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
    case GET_LOGIN_REGISTER_ERROR:
      return Object.assign({}, state, {
        loginRegisterError: action.message,
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
