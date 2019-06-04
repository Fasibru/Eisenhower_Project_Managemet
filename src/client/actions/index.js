import axios from 'axios';
import {
  ADD_TASK,
  GET_TASKS,
  GET_FILTERS,
  TOGGLE_NEW_TASK_POPUP,
  TOGGLE_EDIT_TASK_POPUP,
  OPEN_EDIT_TASK_POPUP,
  CLOSE_EDIT_TASK_POPUP,
  RESET_EDIT_TASK_STATE,
  STORE_EDIT_TASK_FORM_CHANGE,
  POPULATE_EDIT_TASK_FORM,
  SAVE_EDITED_TASK,
} from '../constants/action-types';

export const getTasks = () => (dispatch) => {
  axios.get('/api/tasks')
    .then((res) => {
      dispatch({
        type: GET_TASKS,
        tasks: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getFilters = () => (dispatch) => {
  axios.get('/api/filters')
    .then((res) => {
      dispatch({
        type: GET_FILTERS,
        filters: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const saveEditedTask = (task, index) => ({
  type: SAVE_EDITED_TASK,
  task,
  index,
});

export const addTask = payload => ({
  type: ADD_TASK,
  payload,
});

export const toggleNewTaskPopup = () => ({
  type: TOGGLE_NEW_TASK_POPUP,
});

export const toggleEditTaskPopupRedux = () => ({
  type: TOGGLE_EDIT_TASK_POPUP,
});

export const openEditTaskPopup = () => ({
  type: OPEN_EDIT_TASK_POPUP,
});

export const closeEditTaskPopup = () => ({
  type: CLOSE_EDIT_TASK_POPUP,
});

export const resetEditTaskState = () => ({
  type: RESET_EDIT_TASK_STATE,
});

export const populateEditTaskForm = payload => ({
  type: POPULATE_EDIT_TASK_FORM,
  editTask: payload,
});

export const storeEditTaskFormChange = (name, value) => ({
  type: STORE_EDIT_TASK_FORM_CHANGE,
  name,
  value,
});
