import axios from 'axios';
import {
  ADD_TASK,
  GET_TASKS,
  TOGGLE_NEW_TASK_POPUP,
} from '../constants/action-types';

export const addTask = payload => ({
  type: ADD_TASK,
  payload,
});

export const getTasks = () => (dispatch) => {
  axios.get('/api/tasks')
    .then((res) => {
      dispatch({
        type: GET_TASKS,
        tasks: res,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const toggleNewTaskPopup = () => ({
  type: TOGGLE_NEW_TASK_POPUP,
});
