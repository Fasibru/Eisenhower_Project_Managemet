import {
  ADD_TASK,
  GET_TASKS,
  POPULATE_EDIT_TASK_FORM,
  TOGGLE_NEW_TASK_POPUP,
} from '../constants/action-types';

const initialState = {
  // filteredTasksRedux: [],
  newTaskPopup: false,
  // newTask: {},
  // editTaskPopup: false,
  editTask: {},
  // filtersRedux: {},
  tasks: [],
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return Object.assign({}, state, {
        tasks: action.tasks,
      });
    case POPULATE_EDIT_TASK_FORM:
      return Object.assign({}, state, {
        editTask: action.editTask,
      });
    case TOGGLE_NEW_TASK_POPUP:
      return Object.assign({}, state, {
        newTaskPopup: !state.newTaskPopup,
      });
    // case ADD_TASK:
    //   return Object.assign({}, state, {
    //     filteredTasks: state.filteredTasks.concat(action.payload),
    //   });
    default:
      return state;
  }
};

export default tasksReducer;
