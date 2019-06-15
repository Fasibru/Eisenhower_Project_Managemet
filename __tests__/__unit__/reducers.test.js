import taskReducer from '../../src/client/reducers/tasks.reducer';
import filtersReducer from '../../src/client/reducers/filters.reducer';
import {
  ADD_NEW_TASK,
  GET_TASKS,
  OPEN_NEW_TASK_POPUP,
  CLOSE_NEW_TASK_POPUP,
  OPEN_EDIT_TASK_POPUP,
  CLOSE_EDIT_TASK_POPUP,
  SAVE_EDITED_TASK,
  POPULATE_EDIT_TASK_FORM,
  STORE_NEW_TASK_FORM_CHANGE,
  STORE_EDIT_TASK_FORM_CHANGE,
  DELETE_TASK,
  GET_FILTERS,
  UPDATE_FILTERS,
} from '../../src/client/constants/actionTypes';

import singleTaskDBFormat from '../../__mocks__/singleTaskDBFormat.mock.json';
import multipleTasksDBFormat from '../../__mocks__/multipleTasksDBFormat.mock.json';
import multipleTasksDBFormatEdit from '../../__mocks__/multipleTasksDBFormatEdit.mock.json';
import filtersDBFormat from '../../__mocks__/filtersDBFormat.mock.json';

const initialStateTasks = {
  tasks: [],
  newTaskPopup: false,
  newTask: {
    title: '',
    description: '',
  },
  editTaskPopup: false,
  editTask: {},
};

const initialStateFilters = {
  filters: {
    showTasks: 'both',
  },
};

describe('Task reducers', () => {
  it('Should return the initial state', () => {
    expect(taskReducer(undefined, {})).toEqual(initialStateTasks);
  });

  it('Should handle ADD_NEW_TASK', () => {
    expect(
      taskReducer(
        initialStateTasks,
        {
          type: ADD_NEW_TASK,
          task: singleTaskDBFormat.data,
        },
      ),
    ).toEqual(
      {
        ...initialStateTasks,
        tasks: [
          ...initialStateTasks.tasks,
          singleTaskDBFormat.data,
        ],
      },
    );
  });

  it('Should handle GET_TASKS', () => {
    expect(
      taskReducer(
        initialStateTasks,
        {
          type: GET_TASKS,
          tasks: multipleTasksDBFormat.data,
        },
      ),
    ).toEqual(
      {
        ...initialStateTasks,
        tasks: multipleTasksDBFormat.data,
      },
    );
  });

  it('Should handle OPEN_NEW_TASK_POPUP', () => {
    expect(
      taskReducer(
        initialStateTasks,
        {
          type: OPEN_NEW_TASK_POPUP,
        },
      ),
    ).toEqual(
      {
        ...initialStateTasks,
        newTaskPopup: true,
      },
    );
  });

  it('Should handle CLOSE_NEW_TASK_POPUP', () => {
    expect(
      taskReducer(
        {
          ...initialStateTasks,
          newTaskPopup: true,
          newTask: {
            title: 'Test Title',
            description: 'Test Description',
            category: 'B',
            completed: true,
          },
        },
        {
          type: CLOSE_NEW_TASK_POPUP,
        },
      ),
    ).toEqual(
      {
        ...initialStateTasks,
        newTask: {
          title: '',
          description: '',
          category: 'A',
          completed: false,
        },
      },
    );
  });

  it('Should handle OPEN_EDIT_TASK_POPUP', () => {
    expect(
      taskReducer(
        initialStateTasks,
        {
          type: OPEN_EDIT_TASK_POPUP,
        },
      ),
    ).toEqual(
      {
        ...initialStateTasks,
        editTaskPopup: true,
      },
    );
  });

  it('Should handle CLOSE_EDIT_TASK_POPUP', () => {
    expect(
      taskReducer(
        {
          ...initialStateTasks,
          editTaskPopup: true,
          editTask: singleTaskDBFormat.data,
        },
        {
          type: CLOSE_EDIT_TASK_POPUP,
        },
      ),
    ).toEqual(initialStateTasks);
  });

  it('Should handle SAVE_EDITED_TASK', () => {
    expect(
      taskReducer(
        {
          ...initialStateTasks,
          tasks: multipleTasksDBFormat.data,
        },
        {
          type: SAVE_EDITED_TASK,
          task: singleTaskDBFormat.data,
          index: 1,
        },
      ),
    ).toEqual(
      {
        ...initialStateTasks,
        tasks: multipleTasksDBFormatEdit.data,
      },
    );
  });

  it('Should handle POPULATE_EDIT_TASK_FORM', () => {
    expect(
      taskReducer(
        initialStateTasks,
        {
          type: POPULATE_EDIT_TASK_FORM,
          editTask: singleTaskDBFormat.data,
        },
      ),
    ).toEqual(
      {
        ...initialStateTasks,
        editTask: singleTaskDBFormat.data,
      },
    );
  });

  it('Should handle STORE_EDIT_TASK_FORM_CHANGE', () => {
    // title
    expect(taskReducer(initialStateTasks, {
      type: STORE_EDIT_TASK_FORM_CHANGE,
      name: 'title',
      value: 'Test Title',
    })).toEqual({
      ...initialStateTasks,
      editTask: { title: 'Test Title' },
    });

    // description
    expect(taskReducer(initialStateTasks, {
      type: STORE_EDIT_TASK_FORM_CHANGE,
      name: 'description',
      value: 'Test Description',
    })).toEqual({
      ...initialStateTasks,
      editTask: { description: 'Test Description' },
    });

    // category
    expect(taskReducer(initialStateTasks, {
      type: STORE_EDIT_TASK_FORM_CHANGE,
      name: 'category',
      value: 'B',
    })).toEqual({
      ...initialStateTasks,
      editTask: { category: 'B' },
    });

    // completed
    expect(taskReducer(initialStateTasks, {
      type: STORE_EDIT_TASK_FORM_CHANGE,
      name: 'completed',
      value: true,
    })).toEqual({
      ...initialStateTasks,
      editTask: { completed: true },
    });
  });

  it('Should handle STORE_NEW_TASK_FORM_CHANGE', () => {
    // title
    expect(taskReducer(initialStateTasks, {
      type: STORE_NEW_TASK_FORM_CHANGE,
      name: 'title',
      value: 'Test Title',
    })).toEqual({
      ...initialStateTasks,
      newTask: {
        ...initialStateTasks.newTask,
        title: 'Test Title',
      },
    });

    // description
    expect(taskReducer(initialStateTasks, {
      type: STORE_NEW_TASK_FORM_CHANGE,
      name: 'description',
      value: 'Test Description',
    })).toEqual({
      ...initialStateTasks,
      newTask: {
        ...initialStateTasks.newTask,
        description: 'Test Description',
      },
    });

    // category
    expect(taskReducer(initialStateTasks, {
      type: STORE_NEW_TASK_FORM_CHANGE,
      name: 'category',
      value: 'B',
    })).toEqual({
      ...initialStateTasks,
      newTask: {
        ...initialStateTasks.newTask,
        category: 'B',
      },
    });

    // completed
    expect(taskReducer(initialStateTasks, {
      type: STORE_NEW_TASK_FORM_CHANGE,
      name: 'completed',
      value: true,
    })).toEqual({
      ...initialStateTasks,
      newTask: {
        ...initialStateTasks.newTask,
        completed: true,
      },
    });
  });

  it('Should handle DELETE_TASK', () => {
    expect(
      taskReducer(
        {
          ...initialStateTasks,
          tasks: multipleTasksDBFormat.data,
        },
        {
          type: DELETE_TASK,
          index: 2,
        },
      ),
    ).toEqual(
      {
        ...initialStateTasks,
        tasks: [
          ...multipleTasksDBFormat.data.slice(0, 2),
          ...multipleTasksDBFormat.data.slice(3),
        ],
      },
    );
  });
});

describe('Filter reducers', () => {
  it('Should return the initial state', () => {
    expect(filtersReducer(undefined, {})).toEqual(initialStateFilters);
  });

  it('Should handle GET_FILTERS', () => {
    expect(
      filtersReducer(
        initialStateFilters,
        {
          type: GET_FILTERS,
          filters: filtersDBFormat,
        },
      ),
    ).toEqual(
      {
        ...initialStateFilters,
        filters: filtersDBFormat,
      },
    );
  });

  it('Should handle UPDATE_FILTERS', () => {
    expect(
      filtersReducer(
        initialStateFilters,
        {
          type: UPDATE_FILTERS,
          name: 'showTasks',
          value: 'open',
        },
      ),
    ).toEqual(
      {
        ...initialStateFilters,
        filters: {
          ...initialStateFilters.filters,
          showTasks: 'open',
        },
      },
    );
  });
});
