import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ITask } from '../../types/storeTypes';
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

export const saveNewTask = (task: ITask): TaskActionsTypes => ({
  type: SAVE_NEW_TASK,
  task,
});

export const getTasksRequest = (): TaskActionsTypes => ({
  type: GET_TASKS_REQUEST,
});

export const getTasksSuccess = (tasks: ITask[]): TaskActionsTypes => ({
  type: GET_TASKS_SUCCESS,
  tasks,
});

export const getTasksFailure = (error: AxiosError): TaskActionsTypes => ({
  type: GET_TASKS_FAILURE,
  error,
});

export const getTasks = (): ThunkAction<
  void,
  ITask[],
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
  ITask[],
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

export const saveEditedTask = (task: ITask, index: number): TaskActionsTypes => ({
  type: SAVE_EDITED_TASK,
  task,
  index,
});

export const deleteTask = (index: number): TaskActionsTypes => ({
  type: DELETE_TASK,
  index,
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

export const populateEditTaskForm = (payload: ITask): TaskActionsTypes => ({
  type: POPULATE_EDIT_TASK_FORM,
  editTask: payload,
});

export const storeEditTaskFormChange =
(name: string, value: string | boolean): TaskActionsTypes => ({
  type: STORE_EDIT_TASK_FORM_CHANGE,
  name,
  value,
});

export const storeNewTaskFormChange =
(name: string, value: string | boolean): TaskActionsTypes => ({
  type: STORE_NEW_TASK_FORM_CHANGE,
  name,
  value,
});

export const resetTasksStore = () => ({
  type: RESET_TASKS_STORE,
});
