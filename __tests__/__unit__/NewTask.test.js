import React from 'react';
import { shallow } from 'enzyme';
import { NewTask } from '../../src/client/components/js/NewTask';

import newTask from '../../__mocks__/newTask.mock.json';

describe('Testing <NewTask />', () => {
  const fnClick = jest.fn();
  const fnChange = jest.fn();
  const fnSubmit = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NewTask
      closeNewTaskPopup={fnClick}
      storeNewTaskFormChange={fnChange}
      addNewTask={fnSubmit}
      newTask={newTask.newTask}
    />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should call function on "title", "description", "category", "completed" change', () => {
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
    const inputTitle = wrapper.find('input').at(0);
    inputTitle.simulate('change', event);

    const textareaDescription = wrapper.find('textarea');
    textareaDescription.simulate('change', event);

    const checkboxCompleted = wrapper.find('input[type="checkbox"]');
    checkboxCompleted.simulate('change', eventChecked);

    const radioInput = wrapper.find('input[type="radio"]');
    radioInput.at(0).simulate('change', eventChecked);
    radioInput.at(1).simulate('change', eventChecked);
    radioInput.at(2).simulate('change', eventChecked);
    radioInput.at(3).simulate('change', eventChecked);

    // Assertion
    expect(fnChange).toHaveBeenCalledTimes(7);
  });

  it('Should populate "title", "description", "category", "completed" based on props and defaults', () => {
    // identify nodes
    const inputTitle = wrapper.find('input').at(0);
    const textareaDescription = wrapper.find('textarea').at(0);
    const checkboxCompleted = wrapper.find('input[type="checkbox"]');
    const radioInput = wrapper.find('input[type="radio"]');

    // Assertions
    expect(inputTitle.props().value).toEqual(newTask.newTask.title);
    expect(textareaDescription.props().value).toEqual(newTask.newTask.description);
    expect(checkboxCompleted.props().defaultChecked).toEqual(false);

    expect(radioInput.at(0).props().defaultChecked).toBeUndefined();
    expect(radioInput.at(1).props().defaultChecked).toBeUndefined();
    expect(radioInput.at(2).props().defaultChecked).toBeUndefined();
    expect(radioInput.at(3).props().defaultChecked).toBeUndefined();
  });

  it('Close button should call "closeNewTaskPopup" onClick', () => {
    // identify node and simulate click
    const buttonClose = wrapper.find('button[type="button"]');
    buttonClose.simulate('click');

    // Assertion
    expect(fnClick).toHaveBeenCalledTimes(1);
  });

  it('Submitting the form should call "storeNewTaskFormChange" and "closeNewTaskPopup"', () => {
    // define event
    const event = {
      preventDefault: jest.fn(),
    };

    // identify node and simulate submit
    const form = wrapper.find('form');
    form.simulate('submit', event);

    // Assertions
    expect(fnSubmit).toHaveBeenCalledTimes(1);
    expect(fnClick).toHaveBeenCalledTimes(1);
  });
});
