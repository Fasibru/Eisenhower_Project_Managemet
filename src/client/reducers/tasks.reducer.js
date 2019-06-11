import {
  ADD_NEW_TASK,
  GET_TASKS,
  TOGGLE_NEW_TASK_POPUP,
  OPEN_NEW_TASK_POPUP,
  CLOSE_NEW_TASK_POPUP,
  RESET_NEW_TASK_STATE,
  STORE_NEW_TASK_FORM_CHANGE,
  DELETE_TASK,
  POPULATE_EDIT_TASK_FORM,
  TOGGLE_EDIT_TASK_POPUP,
  OPEN_EDIT_TASK_POPUP,
  CLOSE_EDIT_TASK_POPUP,
  RESET_EDIT_TASK_STATE,
  STORE_EDIT_TASK_FORM_CHANGE,
  SAVE_EDITED_TASK,
} from '../constants/actionTypes';


const initialState = {
  tasks: [],
  newTaskPopup: false,
  newTask: {
    title: '',
    description: '',
  },
  editTaskPopup: false,
  editTaskRedux: {},
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_TASK:
      return Object.assign({}, state, {
        tasks: [
          ...state.tasks,
          action.task,
        ],
      });
    case GET_TASKS:
      return Object.assign({}, state, {
        tasks: action.tasks,
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
        newTask: {
          title: '',
          description: '',
          category: 'A',
          completed: false,
        },
      });
    case RESET_NEW_TASK_STATE:
      return Object.assign({}, state, {
        newTask: {},
      });
    case STORE_NEW_TASK_FORM_CHANGE:
      return Object.assign({}, state, {
        newTask: {
          ...state.newTask,
          [action.name]: action.value,
        },
      });
    case TOGGLE_EDIT_TASK_POPUP:
      return Object.assign({}, state, {
        editTaskPopup: !state.editTaskPopup,
      });
    case OPEN_EDIT_TASK_POPUP:
      return Object.assign({}, state, {
        editTaskPopup: true,
      });
    case CLOSE_EDIT_TASK_POPUP:
      return Object.assign({}, state, {
        editTaskPopup: false,
        editTaskRedux: {},
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
        tasks: state.tasks.map((task, index) => {
          if (index === action.index) {
            return action.task;
          }
          return task;
        }),
      });
    case DELETE_TASK:
      return Object.assign({}, state, {
        tasks: [
          ...state.tasks.slice(0, action.index),
          ...state.tasks.slice(action.index + 1),
        ],
      });
    default:
      return state;
  }
};

export default tasksReducer;
