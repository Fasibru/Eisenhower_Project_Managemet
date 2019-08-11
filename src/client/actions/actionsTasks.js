import axios from 'axios';
import {
  GET_TASKS_FAILURE,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  OPEN_NEW_TASK_POPUP,
  CLOSE_NEW_TASK_POPUP,
  OPEN_EDIT_TASK_POPUP,
  CLOSE_EDIT_TASK_POPUP,
  STORE_EDIT_TASK_FORM_CHANGE,
  POPULATE_EDIT_TASK_FORM,
  SAVE_EDITED_TASK,
  SAVE_NEW_TASK,
  DELETE_TASK,
  STORE_NEW_TASK_FORM_CHANGE,
  RESET_TASKS_STORE,
} from '../constants/actionTypesTasks';

export const saveNewTask = task => ({
  type: SAVE_NEW_TASK,
  task,
});

export const getTasksRequest = () => ({
  type: GET_TASKS_REQUEST,
});

export const getTasksSuccess = tasks => ({
  type: GET_TASKS_SUCCESS,
  tasks,
});

export const getTasksFailure = error => ({
  type: GET_TASKS_FAILURE,
  error,
});

export const getTasks = () => (dispatch) => {
  dispatch(getTasksRequest());
  axios.get('/api/tasks')
    .then((res) => {
      dispatch(getTasksSuccess(res.data));
    })
    .catch((error) => {
      dispatch(getTasksFailure(error));
    });
};

export const getUserTasks = userId => (dispatch) => {
  dispatch(getTasksRequest());
  axios.get(`/api/tasks/${userId}`)
    .then((res) => {
      dispatch(getTasksSuccess(res.data));
      // dispatch({
      //   type: GET_TASKS,
      //   tasks: res.data,
      // });
    })
    .catch((error) => {
      console.log(error);
      dispatch(getTasksFailure(error));
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

export const resetTasksStore = () => ({
  type: RESET_TASKS_STORE,
});
