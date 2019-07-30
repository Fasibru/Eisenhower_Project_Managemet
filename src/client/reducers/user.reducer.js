import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  REMOVE_USER,
} from '../constants/actionTypesUser';

const initialState = {
  userId: '',
  isFetchingUser: false,
  userError: '',
  emailAddress: '',
  firstName: '',
  lastName: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return Object.assign({}, state, {
        isFetchingUser: true,
      });
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {
        // isFetchingUser: false,
        // userId: action.user.userId,
        userId: action.user.userId,
        isFetchingUser: false,
        userError: action.user.userError,
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
    default:
      return state;
  }
};

export default userReducer;
