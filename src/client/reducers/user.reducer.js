import {
  GET_USER_ID_REQUEST,
  GET_USER_ID_SUCCESS,
  GET_USER_ID_FAILURE,
} from '../constants/actionTypesUser';

const initialState = {
  userId: '',
  isFetchingUserId: false,
  userIdError: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ID_REQUEST:
      return Object.assign({}, state, {
        isFetchingUserId: true,
      });
    case GET_USER_ID_SUCCESS:
      console.log(action);
      return Object.assign({}, state, {
        isFetchingUserId: false,
        userId: action.userId,
      });
    case GET_USER_ID_FAILURE:
      return Object.assign({}, state, {
        isFetchingUserId: false,
        userIdError: action.error.message,
      });
    default:
      return state;
  }
};

export default userReducer;
