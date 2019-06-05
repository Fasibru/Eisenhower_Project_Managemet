import {
  ADD_NEW_TASK,
  DELETE_TASK,
  GET_TASKS,
  GET_FILTERS,
  POPULATE_EDIT_TASK_FORM,
  TOGGLE_NEW_TASK_POPUP,
  OPEN_NEW_TASK_POPUP,
  CLOSE_NEW_TASK_POPUP,
  RESET_NEW_TASK_STATE,
  TOGGLE_EDIT_TASK_POPUP,
  OPEN_EDIT_TASK_POPUP,
  CLOSE_EDIT_TASK_POPUP,
  RESET_EDIT_TASK_STATE,
  STORE_EDIT_TASK_FORM_CHANGE,
  SAVE_EDITED_TASK,
  STORE_NEW_TASK_FORM_CHANGE,
  UPDATE_FILTERS,
} from '../constants/action-types';

const initialState = {
  filteredTasksRedux: [],
  newTaskPopup: false,
  newTaskRedux: {},
  editTaskPopupRedux: false,
  editTaskRedux: {},
  filtersRedux: {},
  // tasks: [],
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_TASK:
      return Object.assign({}, state, {
        filteredTasksRedux: [
          ...state.filteredTasksRedux,
          action.task,
        ],
      });
    case GET_TASKS:
      return Object.assign({}, state, {
        filteredTasksRedux: action.tasks,
      });
    case GET_FILTERS:
      return Object.assign({}, state, {
        filtersRedux: action.filters,
      });
    case TOGGLE_NEW_TASK_POPUP:
      return Object.assign({}, state, {
        newTaskPopup: !state.newTaskPopup,
      });
    case OPEN_NEW_TASK_POPUP:
      return Object.assign({}, state, {
        newTaskPopup: true,
      });
    case CLOSE_NEW_TASK_POPUP:
      return Object.assign({}, state, {
        newTaskPopup: false,
      });
    case RESET_NEW_TASK_STATE:
      return Object.assign({}, state, {
        newTaskRedux: {},
      });
    case TOGGLE_EDIT_TASK_POPUP:
      return Object.assign({}, state, {
        editTaskPopupRedux: !state.editTaskPopupRedux,
      });
    case OPEN_EDIT_TASK_POPUP:
      return Object.assign({}, state, {
        editTaskPopupRedux: true,
      });
    case CLOSE_EDIT_TASK_POPUP:
      return Object.assign({}, state, {
        editTaskPopupRedux: false,
      });
    case RESET_EDIT_TASK_STATE:
      return Object.assign({}, state, {
        editTaskRedux: {},
      });
    case POPULATE_EDIT_TASK_FORM:
      return Object.assign({}, state, {
        editTaskRedux: action.editTask,
      });
    case STORE_EDIT_TASK_FORM_CHANGE:
      return Object.assign({}, state, {
        editTaskRedux: {
          ...state.editTaskRedux,
          [action.name]: action.value,
        },
      });
    case SAVE_EDITED_TASK:
      return Object.assign({}, state, {
        filteredTasksRedux: state.filteredTasksRedux.map((task, index) => {
          if (index === action.index) {
            return action.task;
          }
          return task;
        }),
      });
    case DELETE_TASK:
      return Object.assign({}, state, {
        filteredTasksRedux: [
          ...state.filteredTasksRedux.slice(0, action.index),
          ...state.filteredTasksRedux.slice(action.index + 1),
        ],
      });
    case STORE_NEW_TASK_FORM_CHANGE:
      return Object.assign({}, state, {
        newTaskRedux: {
          ...state.newTaskRedux,
          [action.name]: action.value,
        },
      });
    case UPDATE_FILTERS:
      return Object.assign({}, state, {
        filtersRedux: {
          ...state.filtersRedux,
          [action.name]: action.value,
        },
        // filteredTasksRedux: state.filteredTasksRedux.map((task) => {
        //   if ( === action.index) {
        //     return action.task;
        //   }
        //   return task;
        // }),
      });
    default:
      return state;
  }
};

export default tasksReducer;
