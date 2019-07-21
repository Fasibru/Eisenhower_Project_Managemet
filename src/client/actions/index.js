import axios from 'axios';
import {
  ADD_NEW_TASK,
  GET_TASKS,
  GET_FILTERS,
  OPEN_NEW_TASK_POPUP,
  CLOSE_NEW_TASK_POPUP,
  OPEN_EDIT_TASK_POPUP,
  CLOSE_EDIT_TASK_POPUP,
  STORE_EDIT_TASK_FORM_CHANGE,
  POPULATE_EDIT_TASK_FORM,
  SAVE_EDITED_TASK,
  DELETE_TASK,
  STORE_NEW_TASK_FORM_CHANGE,
  UPDATE_FILTERS,
} from '../constants/actionTypes';

export const addNewTask = task => (dispatch) => {
  axios.post('/api/task', task)
    .then((res) => {
      dispatch({
        type: ADD_NEW_TASK,
        task: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

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
        filters: res.data[0],
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

export const deleteTask = index => ({
  type: DELETE_TASK,
  index,
});

export const openNewTaskPopup = () => ({
  type: OPEN_NEW_TASK_POPUP,
});

export const closeNewTaskPopup = () => ({
  type: CLOSE_NEW_TASK_POPUP,
});

export const openEditTaskPopup = () => ({
  type: OPEN_EDIT_TASK_POPUP,
});

export const closeEditTaskPopup = () => ({
  type: CLOSE_EDIT_TASK_POPUP,
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

export const storeNewTaskFormChange = (name, value) => ({
  type: STORE_NEW_TASK_FORM_CHANGE,
  name,
  value,
});

export const updateFilters = (name, value) => ({
  type: UPDATE_FILTERS,
  name,
  value,
});
