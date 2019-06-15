import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import { EditTask } from '../../src/client/components/js/EditTask';

import singleTask from '../../__mocks__/singleTaskDBFormat.mock.json';
import multipleTasks from '../../__mocks__/multipleTasksDBFormat.mock.json';

jest.mock('axios');

describe('Testing <EditTask />', () => {
  const fnClickClose = jest.fn();
  const fnClickDelete = jest.fn();
  const fnSubmit = jest.fn();
  const fnChange = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EditTask
      closeEditTaskPopup={fnClickClose}
      editTask={singleTask.data}
      storeEditTaskFormChange={fnChange}
      tasks={multipleTasks.data}
      saveEditedTask={fnSubmit}
      deleteTask={fnClickDelete}
      handleDelete={jest.fn()}
    />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should populate "title", "description", "category", "completed" correctly from props', () => {
    // identify nodes
    const inputTitle = wrapper.find('input[name="title"]');
    const textareaDescription = wrapper.find('textarea[name="description"]');
    const radioCategory = wrapper.find('input[type="radio"]');
    const checkboxCompleted = wrapper.find('input[type="checkbox"][name="completed"]');

    // Assertions
    expect(inputTitle.props().defaultValue).toEqual(singleTask.data.title);
    expect(textareaDescription.props().defaultValue).toEqual(singleTask.data.description);
    expect(radioCategory.at(0).props().defaultChecked).toEqual(true);
    expect(radioCategory.at(1).props().defaultChecked).toEqual(false);
    expect(radioCategory.at(2).props().defaultChecked).toEqual(false);
    expect(radioCategory.at(3).props().defaultChecked).toEqual(false);
    expect(checkboxCompleted.props().checked).toEqual(singleTask.data.completed);
  });

  it('Should call "closeEditTaskPopup" with "Close" button', () => {
    // identify node and simulate click
    const buttonClose = wrapper.find('button').at(0);
    buttonClose.simulate('click');

    // Assertion
    expect(fnClickClose).toHaveBeenCalledTimes(1);
  });

  it('Should call "deleteTask", "closeEditTaskPopup" and axios DELETE with "Delete" button', () => {
    // mock axios DELETE call
    axios.delete.mockResolvedValue();

    // identify node and simulate click
    const buttonDelete = wrapper.find('button').at(1);
    buttonDelete.simulate('click');

    // Assertions
    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(fnClickDelete).toHaveBeenCalledTimes(1);
    expect(fnClickClose).toHaveBeenCalledTimes(1);
  });

  it('Should call "storeEditTaskFormChange" on change', () => {
    // define events
    const event = {
      target:
        { value: '' },
    };

    const eventChecked = {
      target:
        { checked: true },
    };

    // identify nodes and simulate changes
    const inputTitle = wrapper.find('input[name="title"]');
    inputTitle.simulate('change', event);
    expect(fnChange).toHaveBeenCalledTimes(1);
    fnChange.mockClear();

    const textareaDescription = wrapper.find('textarea[name="description"]');
    textareaDescription.simulate('change', event);
    expect(fnChange).toHaveBeenCalledTimes(1);
    fnChange.mockClear();

    const radioCategory = wrapper.find('input[type="radio"]');
    radioCategory.at(0).simulate('change', eventChecked);
    expect(fnChange).toHaveBeenCalledTimes(1);
    fnChange.mockClear();

    radioCategory.at(1).simulate('change', eventChecked);
    expect(fnChange).toHaveBeenCalledTimes(1);
    fnChange.mockClear();

    radioCategory.at(2).simulate('change', eventChecked);
    expect(fnChange).toHaveBeenCalledTimes(1);
    fnChange.mockClear();

    radioCategory.at(3).simulate('change', eventChecked);
    expect(fnChange).toHaveBeenCalledTimes(1);
    fnChange.mockClear();

    const checkboxCompleted = wrapper.find('input[type="checkbox"][name="completed"]');
    checkboxCompleted.simulate('change', eventChecked);
    expect(fnChange).toHaveBeenCalledTimes(1);
    fnChange.mockClear();
  });
});
