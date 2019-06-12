import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  ADD_NEW_TASK,
  GET_TASKS,
  GET_FILTERS,
  OPEN_NEW_TASK_POPUP,
  CLOSE_NEW_TASK_POPUP,
  OPEN_EDIT_TASK_POPUP,
  CLOSE_EDIT_TASK_POPUP,
  SAVE_EDITED_TASK,
  DELETE_TASK,
  POPULATE_EDIT_TASK_FORM,
  STORE_EDIT_TASK_FORM_CHANGE,
  STORE_NEW_TASK_FORM_CHANGE,
  UPDATE_FILTERS,
} from '../../src/client/constants/actionTypes';
import {
  addNewTask,
  getTasks,
  getFilters,
  openNewTaskPopup,
  closeNewTaskPopup,
  openEditTaskPopup,
  closeEditTaskPopup,
  saveEditedTask,
  deleteTask,
  populateEditTaskForm,
  storeEditTaskFormChange,
  storeNewTaskFormChange,
  updateFilters,
} from '../../src/client/actions/index';

import singleTaskDataDBFormat from '../../__mocks__/singleTaskDBFormat.mock.json';
import multipleTasksDBFormat from '../../__mocks__/multipleTasksDBFormat.mock.json';
import newTaskData from '../../__mocks__/newTask.mock.json';
import filtersDBFormat from '../../__mocks__/filtersDBFormat.json';

// mock axios and store
jest.mock('axios');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Async actions', () => {
  // create mock store before each test
  let store;
  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should create an action that adds a new task', async () => {
    // mock the response of the axios POST call
    const response = singleTaskDataDBFormat;
    axios.post.mockResolvedValue(response);

    const expectedActions = [{
      type: ADD_NEW_TASK,
      task: singleTaskDataDBFormat.data,
    }];

    // dispatch action
    await store.dispatch(addNewTask(newTaskData));

    // Assertions
    expect(store.getActions()).toEqual(expectedActions);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it('Should create an action that gets the tasks', async () => {
    // mock the response of the axios GET call
    const response = multipleTasksDBFormat;
    axios.get.mockResolvedValue(response);

    const expectedActions = [{
      type: GET_TASKS,
      tasks: response.data,
    }];

    // dispatch action
    await store.dispatch(getTasks());

    // Assertions
    expect(store.getActions()).toEqual(expectedActions);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('Should create action that gets filters', async () => {
    // mock the response of the axios GET call
    const response = filtersDBFormat;
    axios.get.mockResolvedValue(response);

    const expectedActions = [{
      type: GET_FILTERS,
      filters: filtersDBFormat.data[0],
    }];

    // dispatch action
    await store.dispatch(getFilters());

    // Assertions
    expect(store.getActions()).toEqual(expectedActions);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});

describe('Actions toggling task dialog windows', () => {
  it('Should create an action to open the newTask dialog window', () => {
    const expectedAction = {
      type: OPEN_NEW_TASK_POPUP,
    };

    expect(openNewTaskPopup()).toEqual(expectedAction);
  });

  it('Should create an action to close the newTask dialog window', () => {
    const expectedAction = {
      type: CLOSE_NEW_TASK_POPUP,
    };

    expect(closeNewTaskPopup()).toEqual(expectedAction);
  });

  it('Should create an action to open the editTask dialog window', () => {
    const expectedAction = {
      type: OPEN_EDIT_TASK_POPUP,
    };

    expect(openEditTaskPopup()).toEqual(expectedAction);
  });

  it('Should create an action to close the editTask dialog window', () => {
    const expectedAction = {
      type: CLOSE_EDIT_TASK_POPUP,
    };

    expect(closeEditTaskPopup()).toEqual(expectedAction);
  });
});

describe('Actions for editing and adding tasks', () => {
  it('Should create an action that saves edits to state', () => {
    const task = singleTaskDataDBFormat.data;
    const index = 1;
    const expectedAction = {
      type: SAVE_EDITED_TASK,
      task,
      index,
    };

    expect(saveEditedTask(task, index)).toEqual(expectedAction);
  });

  it('Should create an action that stores edits in state temporarily', () => {
    const name = 'title';
    const value = 'Test';
    const expectedAction = {
      type: STORE_EDIT_TASK_FORM_CHANGE,
      name,
      value,
    };

    expect(storeEditTaskFormChange(name, value)).toEqual(expectedAction);
  });

  it('Should create an action that stores new tasks in state temporarily', () => {
    const name = 'title';
    const value = 'Test';
    const expectedAction = {
      type: STORE_NEW_TASK_FORM_CHANGE,
      name,
      value,
    };

    expect(storeNewTaskFormChange(name, value)).toEqual(expectedAction);
  });

  it('Should create an action that deletes a task', () => {
    const index = 1;
    const expectedAction = {
      type: DELETE_TASK,
      index,
    };

    expect(deleteTask(index)).toEqual(expectedAction);
  });

  it('Should create an action that populates the form for editing a task', () => {
    const editTask = singleTaskDataDBFormat.data;
    const expectedAction = {
      type: POPULATE_EDIT_TASK_FORM,
      editTask,
    };

    expect(populateEditTaskForm(editTask)).toEqual(expectedAction);
  });
});

describe('Actions regarding filters', () => {
  it('Should create an action that updates the respective filter', () => {
    const name = 'showTasks';
    const value = 'completed';
    const expectedAction = {
      type: UPDATE_FILTERS,
      name,
      value,
    };

    expect(updateFilters(name, value)).toEqual(expectedAction);
  });
});
