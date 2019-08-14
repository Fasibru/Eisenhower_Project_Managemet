import { Tasks } from '../../types/storeTypes';
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

const initialState: Tasks = {
  tasks: [],
  newTask: {
    description: '',
    title: '',
  },
  newTaskPopup: false,
  editTaskPopup: false,
  editTask: {
    __v: -999,
    _id: '',
    category: '',
    completed: false,
    date: '',
    description: '',
    members: [],
    rank: -999,
    title: '',
  },
  isFetchingTasks: false,
  fetchingError: '',
};

const tasksReducer = (state = initialState, action: TaskActionsTypes): Tasks => {
  switch (action.type) {
    case GET_TASKS_REQUEST:
      return Object.assign({}, state, {
        isFetchingTasks: true,
      });
    case GET_TASKS_SUCCESS:
      return Object.assign({}, state, {
        tasks: action.tasks,
        isFetchingTasks: false,
        fetchingError: '',
      });
    case GET_TASKS_FAILURE:
      return Object.assign({}, state, {
        isFetchingTasks: false,
        fetchingError: action.error.message,
      });
    case OPEN_NEW_TASK_POPUP:
      return Object.assign({}, state, {
        newTaskPopup: true,
      });
    case CLOSE_NEW_TASK_POPUP:
      return Object.assign({}, state, {
        newTaskPopup: false,
        newTask: {
          title: '',
          description: '',
          category: 'A',
          completed: false,
        },
      });
    case STORE_NEW_TASK_FORM_CHANGE:
      return Object.assign({}, state, {
        newTask: {
          ...state.newTask,
          [action.name]: action.value,
        },
      });
    case OPEN_EDIT_TASK_POPUP:
      return Object.assign({}, state, {
        editTaskPopup: true,
      });
    case CLOSE_EDIT_TASK_POPUP:
      return Object.assign({}, state, {
        editTaskPopup: false,
        editTask: {},
      });
    case POPULATE_EDIT_TASK_FORM:
      return Object.assign({}, state, {
        editTask: action.editTask,
      });
    case STORE_EDIT_TASK_FORM_CHANGE:
      return Object.assign({}, state, {
        editTask: {
          ...state.editTask,
          [action.name]: action.value,
        },
      });
    case SAVE_EDITED_TASK:
      return Object.assign({}, state, {
        tasks: state.tasks.map((task, index) => {
          if (index === action.index) {
            return action.task;
          }
          return task;
        }),
      });
    case SAVE_NEW_TASK:
      return Object.assign({}, state, {
        tasks: [
          ...state.tasks,
          action.task,
        ],
      });
    case DELETE_TASK:
      return Object.assign({}, state, {
        tasks: [
          ...state.tasks.slice(0, action.index),
          ...state.tasks.slice(action.index + 1),
        ],
      });
    case RESET_TASKS_STORE:
      return Object.assign({}, initialState);
    default:
      return state;
  }
};

export default tasksReducer;
