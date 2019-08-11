import { AxiosError } from 'axios';
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
} from '../client/constants/actionTypesTasks';
import { Task } from './storeTypes';

interface SaveNewTaskAction {
  type: typeof SAVE_NEW_TASK;
  task: Task;
}

interface GetTasksRequestAction {
  type: typeof GET_TASKS_REQUEST;
}

interface GetTasksSuccessAction {
  type: typeof GET_TASKS_SUCCESS;
  tasks: Task[];
}

interface GetTasksFailureAction {
  type: typeof GET_TASKS_FAILURE;
  error: AxiosError;
}

interface SaveEditedTaskAction {
  type: typeof SAVE_EDITED_TASK;
  task: Task;
  index: number;
}

interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  index: number;
}

interface OpenNewTaskPopupAction {
  type: typeof OPEN_NEW_TASK_POPUP;
}

interface CloseNewTaskPopupAction {
  type: typeof CLOSE_NEW_TASK_POPUP;
}

interface OpenEditTaskPopupAction {
  type: typeof OPEN_EDIT_TASK_POPUP;
}

interface CloseEditTaskPopupAction {
  type: typeof CLOSE_EDIT_TASK_POPUP;
}

interface PopulateEditTaskFormAction {
  type: typeof POPULATE_EDIT_TASK_FORM;
}

interface StoreEditTaskFormChangeAction {
  type: typeof STORE_EDIT_TASK_FORM_CHANGE;
  name: string;
  value: boolean | string;
}

interface StoreNewTaskFormChangeAction {
  type: typeof STORE_NEW_TASK_FORM_CHANGE;
  name: string;
  value: boolean | string;
}

interface ResetTasksStoreAction {
  type: typeof RESET_TASKS_STORE;
}

export type TaskActionsTypes =
CloseEditTaskPopupAction |
CloseNewTaskPopupAction |
DeleteTaskAction |
GetTasksFailureAction |
GetTasksRequestAction |
GetTasksSuccessAction |
OpenEditTaskPopupAction |
OpenNewTaskPopupAction |
PopulateEditTaskFormAction |
ResetTasksStoreAction |
SaveEditedTaskAction |
SaveNewTaskAction |
StoreEditTaskFormChangeAction |
StoreNewTaskFormChangeAction;
