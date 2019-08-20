import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TaskType } from '../../types/storeTypes';
import { TaskActionsTypes } from '../../types/taskActionTypes';
import {
  CLOSE_EDIT_TASK_POPUP,
  CLOSE_NEW_TASK_POPUP,
  DELETE_TASK,
  GET_TASKS_FAILURE,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  OPEN_EDIT_TASK_POPUP,
  OPEN_NEW_TASK_POPUP,
  POPULATE_EDIT_TASK_FORM,
  RESET_TASKS_STORE,
  SAVE_EDITED_TASK,
  SAVE_NEW_TASK,
  STORE_EDIT_TASK_FORM_CHANGE,
  STORE_NEW_TASK_FORM_CHANGE,
} from '../constants/actionConstantsTasks';

export const saveNewTask = (task: TaskType): TaskActionsTypes => ({
  task,
  type: SAVE_NEW_TASK,
});

export const getTasksRequest = (): TaskActionsTypes => ({
  type: GET_TASKS_REQUEST,
});

export const getTasksSuccess = (tasks: TaskType[]): TaskActionsTypes => ({
  tasks,
  type: GET_TASKS_SUCCESS,
});

export const getTasksFailure = (error: AxiosError): TaskActionsTypes => ({
  error,
  type: GET_TASKS_FAILURE,
});

export const getTasks = (): ThunkAction<
  void,
  TaskType[],
  null,
  TaskActionsTypes
> => (dispatch: Dispatch) => {
  dispatch(getTasksRequest());
  axios.get('/api/tasks')
    .then((res: AxiosResponse) => {
      dispatch(getTasksSuccess(res.data));
    })
    .catch((error: AxiosError) => {
      dispatch(getTasksFailure(error));
    });
};

export const getUserTasks = (userId: string): ThunkAction<
  void,
  TaskType[],
  null,
  TaskActionsTypes
> => (dispatch: Dispatch) => {
  dispatch(getTasksRequest());
  axios.get(`/api/tasks/${userId}`)
    .then((res: AxiosResponse) => {
      dispatch(getTasksSuccess(res.data));
    })
    .catch((error: AxiosError) => {
      dispatch(getTasksFailure(error));
    });
};

export const saveEditedTask = (task: TaskType): TaskActionsTypes => ({
  task,
  type: SAVE_EDITED_TASK,
});

export const deleteTask = (index: number): TaskActionsTypes => ({
  index,
  type: DELETE_TASK,
});

export const openNewTaskPopup = (): TaskActionsTypes => ({
  type: OPEN_NEW_TASK_POPUP,
});

export const closeNewTaskPopup = (): TaskActionsTypes => ({
  type: CLOSE_NEW_TASK_POPUP,
});

export const openEditTaskPopup = (): TaskActionsTypes => ({
  type: OPEN_EDIT_TASK_POPUP,
});

export const closeEditTaskPopup = (): TaskActionsTypes => ({
  type: CLOSE_EDIT_TASK_POPUP,
});

export const populateEditTaskForm = (payload: TaskType): TaskActionsTypes => ({
  editTask: payload,
  type: POPULATE_EDIT_TASK_FORM,
});

export const storeEditTaskFormChange =
(name: string, value: string | boolean): TaskActionsTypes => ({
  name,
  value,
  // tslint:disable-next-line: object-literal-sort-keys
  type: STORE_EDIT_TASK_FORM_CHANGE,
});

export const storeNewTaskFormChange =
(name: string, value: string | boolean): TaskActionsTypes => ({
  name,
  value,
  // tslint:disable-next-line: object-literal-sort-keys
  type: STORE_NEW_TASK_FORM_CHANGE,
});

export const resetTasksStore = () => ({
  type: RESET_TASKS_STORE,
});
